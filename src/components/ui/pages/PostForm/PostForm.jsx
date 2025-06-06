import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";

import {
  Button,
  TextInput,
  MultiSelect,
  Paper,
  Title,
  TagsInput,
  Textarea,
  Flex,
  LoadingOverlay,
  FileInput,
  Image,
  Notification,
  Text,
  ActionIcon,
  CloseButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCircleCheckFilled, IconMinus, IconXboxXFilled } from "@tabler/icons-react";

import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useItemsCRUD } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const schema = z.object({
  title: z.string().min(6, { message: "The title of the post must be at least 6 characters" }),
  content: z.string().min(6, {
    message: "The content of the post must be at least 6 characters",
  }),
  imagesFiles: z
    .array(z.union([z.instanceof(File), z.string().url()]))
    .min(1, "At least one image is required")
    .refine(
      (files) =>
        files.every((file) => {
          if (typeof file === "string") return true;
          return file.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(file.type);
        }),
      {
        message: "Invalid images - must be either existing URLs or valid new files (max 1MB, only .jpg, .png, .webp)",
      }
    ),
});

export default function PostForm({ isEdited }) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [articleNotification, setArticleNotification] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.article;

  if (isEdited && !data) {
    navigate("/blog");
  }

  const {
    itemError: createError,
    changeError: editError,
    createItem: createArticle,
    editItem: editArticle,
  } = useItemsCRUD(endpoints.blog);

  const form = useForm({
    initialValues: {
      title: data?.title || "",
      category: data?.category || [],
      tags: data?.tags || [],
      content: data?.content?.join("\n") || "",
      cuisine: data?.cuisine || "",
      imagesFiles: data?.images || [],
    },
    validate: zodResolver(schema),
  });

  useEffect(() => {
    if (isEdited && data?.images) {
      setPreviewUrls(data.images);
    }
  }, [isEdited, data]);

  const handleImageChange = (newFiles) => {
    if (!newFiles) return;

    const validNewFiles = Array.from(newFiles).filter((file) => file instanceof File);

    const allFiles = [...form.values.imagesFiles.filter((file) => typeof file === "string"), ...validNewFiles];

    form.setFieldValue("imagesFiles", allFiles);

    const urls = allFiles.map((file) => (typeof file === "string" ? file : URL.createObjectURL(file)));
    setPreviewUrls(urls);
  };

  const handleUploadImages = async (files) => {
    return Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      })
    );
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...form.values.imagesFiles];
    updatedFiles.splice(index, 1);

    form.setFieldValue("imagesFiles", updatedFiles);
    setPreviewUrls(updatedFiles.map((file) => (typeof file === "string" ? file : URL.createObjectURL(file))));
  };

  const handleSubmit = async (values) => {
    setIsUploading(true);

    try {
      const newFiles = values.imagesFiles.filter((file) => file instanceof File);
      const existingUrls = values.imagesFiles.filter((file) => typeof file === "string");

      const uploadedUrls = newFiles.length > 0 ? await handleUploadImages(newFiles) : [];

      const articleData = {
        title: values.title,
        category: values.category,
        tags: values.tags || null,
        content: values.content.split("\n").filter((p) => p.trim() !== ""),
        cuisine: values.cuisine,
        readingTimeMinutes: Math.ceil(values.content.trim().split(/\s+/).filter(Boolean).length / 150),
        images: [...existingUrls, ...uploadedUrls],

        rating: isEdited ? data?.rating : 0,
        views: isEdited ? data?.views : 0,
        reactions: isEdited ? data?.reactions : { likes: 0, dislikes: 0 },
        reviewCount: isEdited ? data?.reviewCount : 0,
      };

      const result = isEdited ? await editArticle(data._id, articleData) : await createArticle(articleData);

      if (result) {
        const notification = {
          title: `Successfuly ${isEdited ? "update" : "create"}`,
          message: `The article ${result.title} was ${isEdited ? "updated" : "created"} sucessfuly!`,
        };
        setArticleNotification(notification);
        form.reset();
      }
    } catch (error) {
      console.error("Uploading error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Paper withBorder shadow="lg" p="lg" mt="lg" style={{ maxWidth: 600, margin: "auto", position: "relative" }}>
      <CloseButton onClick={() => navigate(-1)} pos="absolute" top={20} right={20} zindex={1} />

      <LoadingOverlay visible={isUploading} />

      <Title align="center" mb="md">
        {`${isEdited ? "Edit" : "Create"} Blog Post`}
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Post Title"
          placeholder="Enter post title"
          mb="sm"
          {...form.getInputProps("title")}
          required
        />
        <MultiSelect
          label="Categories"
          placeholder="Please select categories"
          data={["Food presentation", "Gourmet", "Cooking Tips", "Food Travel", "Food Stories"]}
          mb="sm"
          {...form.getInputProps("category")}
          required
          style={{ flex: 1 }}
        />
        <Flex gap="md" justify="space-between" align="flex-start" mb="sm">
          <TagsInput
            label="Tags"
            placeholder="Please fill in the tags and press Enter"
            {...form.getInputProps("tags")}
            style={{ flex: 1 }}
          />

          <TextInput label="Cuisine" placeholder="Cuisine" {...form.getInputProps("cuisine")} style={{ flex: 1 }} />
        </Flex>

        <Textarea
          label="Post content"
          placeholder="Enter the content of the post"
          minRows={3}
          maxRows={20}
          mb="sm"
          {...form.getInputProps("content")}
          required
        />

        <FileInput
          label="Images"
          placeholder="Select images"
          accept="image/*"
          multiple
          required
          value={form.values.imagesFiles.filter((f) => f instanceof File)}
          onChange={handleImageChange}
          error={form.errors.imagesFiles}
        />

        {previewUrls.map((url, index) => (
          <Flex align="center" gap="lg" key={index}>
            <Image
              src={typeof url === "string" ? url : URL.createObjectURL(url)}
              alt={`Preview ${index + 1}`}
              height={300}
              fit="contain"
              mb="sm"
            />
            <ActionIcon variant="outline" size="sm" radius="0" onClick={() => handleRemoveImage(index)}>
              <IconMinus size="1em" />
            </ActionIcon>
          </Flex>
        ))}

        <Button type="submit" fullWidth radius="0" mt="lg" tt="uppercase" disabled={!form.isValid()}>
          {isEdited ? "Update Post" : "Create Post"}
        </Button>

        {articleNotification && (
          <Notification
            icon={<IconCircleCheckFilled size={24} />}
            title={` Article ${isEdited ? "Updated" : "Created"} Successful`}
            color="teal"
            mt="md"
            withCloseButton
            onClose={() => {
              setArticleNotification(null);
              navigate("/blog");
            }}
          >
            <Text>{articleNotification.message}</Text>
          </Notification>
        )}
        {(createError || editError) && (
          <Notification icon={<IconXboxXFilled size={24} />} title="Error" color="red" mt="md">
            {createError || editError}
          </Notification>
        )}
      </form>
    </Paper>
  );
}
