import { useState } from "react";
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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCircleCheckFilled, IconXboxXFilled } from "@tabler/icons-react";

import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useCreateItem } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";
import { Navigate } from "react-router";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const schema = z.object({
  title: z
    .string()
    .min(6, { message: "The title of the post must be at least 6 characters" }),
  content: z.string().min(6, {
    message: "The content of the post must be at least 6 characters",
  }),
  imageFile: z
    .instanceof(File)
    .refine((file) => file?.size <= MAX_FILE_SIZE, "The file must be less 1MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "The supported formats are .jpg, .png and .webp"
    )
    .nullable()
    .optional(),
  image: z.string().optional(),
});

export default function PostCreateForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [articleNotification, setArticleNotification] = useState(null);

  const form = useForm({
    initialValues: {
      title: "",
      category: [],
      tags: [],
      content: "",
      cuisine: "",
      imageFile: null,
    },
    validate: zodResolver(schema),
  });

  const { error: articleError, create: createArticle } = useCreateItem(
    endpoints.blog
  );

  const handleImageChange = (file) => {
    form.setFieldValue("imageFile", file || null);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;

    const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (values) => {
    setIsUploading(true);

    try {
      const imageUrl = values.imageFile
        ? await uploadImage(values.imageFile)
        : null;

      const data = {
        title: values.title,
        category: values.category,
        tags: values.tags || null,
        content: values.content.split("\n").filter((p) => p.trim() !== ""),
        readingTimeMinutes: Math.ceil(
          values.content.trim().split(/\s+/).filter(Boolean).length / 150
        ),
        image: imageUrl || null,
        rating: 0,
        views: 0,
        reactions: {
          likes: 0,
          dislikes: 0,
        },
        reviewCount: 0,
      };

      console.log(data);

      const newArticle = await createArticle(data);

      if (newArticle) {
        const notification = {
          title: "Successfuly create",
          message: `The article ${newArticle.title} was created sucessfuly!`,
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
    <Paper
      withBorder
      shadow="lg"
      p="lg"
      mt="lg"
      style={{ maxWidth: 600, margin: "auto", position: "relative" }}
    >
      <LoadingOverlay visible={isUploading} />
      <Title align="center" mb="md">
        Create Blog Post
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
          data={[
            "Food presentation",
            "Gourmet",
            "Cooking Tips",
            "Food Travel",
            "Food Stories",
          ]}
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

          <TextInput
            label="Cuisine"
            placeholder="Cuisine"
            {...form.getInputProps("cuisine")}
            style={{ flex: 1 }}
          />
        </Flex>

        <Textarea
          label="Post content"
          placeholder="Enter the content of the post"
          minRows={2}
          maxRows={20}
          mb="sm"
          {...form.getInputProps("content")}
          required
        />

        <FileInput
          label="Image"
          placeholder="Please, select the picture"
          accept="image/jpeg,image/png,image/webp"
          mb="sm"
          value={form.values.imageFile}
          onChange={handleImageChange}
          error={form.errors.imageFile}
        />

        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Image Preview"
            height={300}
            fit="contain"
            mb="sm"
          />
        )}

        <Button
          type="submit"
          fullWidth
          radius="0"
          mt="lg"
          tt="uppercase"
          disabled={!form.isValid()}
        >
          Create Post
        </Button>

        {articleNotification && (
          <Notification
            icon={<IconCircleCheckFilled size={24} />}
            title="Create Article Successful"
            color="teal"
            mt="md"
            withCloseButton
            onClose={() => {
              setArticleNotification(null);
              Navigate("/blog");
            }}
          >
            <Text>{articleNotification.message}</Text>
          </Notification>
        )}
        {articleError && (
          <Notification
            icon={<IconXboxXFilled size={24} />}
            title="Error"
            color="red"
            mt="md"
          >
            {articleError}
          </Notification>
        )}
      </form>
    </Paper>
  );
}
