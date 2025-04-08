import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";

import {
  LoadingOverlay,
  Box,
  Flex,
  Group,
  Paper,
  List,
  ListItem,
  Title,
  Text,
  TextInput,
  TagsInput,
  Select,
  MultiSelect,
  Textarea,
  Image,
  Button,
  ActionIcon,
  FileInput,
  Notification,
  CloseButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCircleCheckFilled, IconPlus, IconMinus, IconXboxXFilled } from "@tabler/icons-react";

import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useItemsCRUD } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const schema = z.object({
  title: z.string().min(6, {
    message: "The title of the recipe must be at least 6 characters",
  }),
  description: z.string().min(6, {
    message: "The description of the recipe must be at least 6 characters",
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

export default function RecipeForm({ isEdited }) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [recipeNotification, setRecipeNotification] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.recipe;

  if (isEdited && !data) {
    navigate("/recipes");
  }

  const {
    itemError: createError,
    changeError: editError,
    createItem: createRecipe,
    editItem: editRecipe,
  } = useItemsCRUD(endpoints.recipes);

  const form = useForm({
    initialValues: {
      title: data?.title || "",
      category: data?.category || [],
      description: data?.description?.join("\n") || [],
      ingredients: data?.ingredients?.join("\n") || [],
      instructions: data?.instructions?.join("\n") || [],
      prepTimeMinutes: data?.prepTimeMinutes || 0,
      cookTimeMinutes: data?.cookTimeMinutes || 0,
      servings: data?.servings || 0,
      caloriesPerServing: data?.caloriesPerServing || 0,
      cuisine: data?.cuisine || "",
      difficulty: data?.difficulty || "",
      tags: data?.tags || [],
      imagesFiles: data?.images || [],
    },
    validate: zodResolver(schema),
  });

  useEffect(() => {
    if (isEdited && data?.ingredients) {
      setIngredients(data.ingredients);
    }
  }, [isEdited, data]);

  useEffect(() => {
    if (isEdited && data?.images) {
      setPreviewUrls(data.images);
    }
  }, [isEdited, data]);

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient("");
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

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
        const storageRef = ref(storage, `recipes/${Date.now()}_${file.name}`);
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

      const recipeData = {
        title: values.title,
        category: values.category,
        description: values.description.split("\n").filter((p) => p.trim() !== ""),
        ingredients: ingredients,
        instructions: values.instructions.split("\n").filter((p) => p.trim() !== ""),

        prepTimeMinutes: Number(values.prepTimeMinutes),
        cookTimeMinutes: Number(values.cookTimeMinutes),
        servings: Number(values.servings),
        caloriesPerServing: Number(values.caloriesPerServing),
        cuisine: values.cuisine,
        difficulty: values.difficulty,
        tags: values.tags || null,
        images: [...existingUrls, ...uploadedUrls],

        rating: isEdited ? data?.rating : 0,
        views: isEdited ? data?.views : 0,
        reactions: isEdited ? data?.reactions : { likes: 0, dislikes: 0 },
        reviewCount: isEdited ? data?.reviewCount : 0,
      };

      const result = isEdited ? await editRecipe(data._id, recipeData) : await createRecipe(recipeData);

      if (result) {
        const notification = {
          title: `Successfuly ${isEdited ? "update" : "create"}`,
          message: `The recipe ${result.title} was ${isEdited ? "updated" : "created"} sucessfuly!`,
        };
        setRecipeNotification(notification);
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
      <CloseButton onClick={() => navigate(-1)} pos="absolute" top={20} right={20} style={{ zIndex: 1 }} />

      <LoadingOverlay visible={isUploading} />

      <Title align="center" mb="md">
        {`${isEdited ? "Edit" : "Create"} Recipe`}
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Recipe Title"
          placeholder="Enter recipe title"
          mb="sm"
          {...form.getInputProps("title")}
          required
        />

        <MultiSelect
          label="Categories"
          placeholder="Please select categories"
          data={["Cakes", "Cookies", "Pies", "Puddings", "Frozen Treats"]}
          mb="sm"
          {...form.getInputProps("category")}
          required
          style={{ flex: 1 }}
        />

        <Textarea
          label="Recipe description"
          placeholder="Enter the short description of the recipe"
          minRows={3}
          maxRows={20}
          mb="sm"
          {...form.getInputProps("description")}
          required
        />

        <Group mt="md" align="flex-end">
          <TextInput
            label="Ingredient"
            placeholder="Example: 200g sugar"
            value={ingredient}
            onChange={(e) => setIngredient(e.currentTarget.value)}
            style={{ flex: 1 }}
          />
          <ActionIcon variant="filled" size="lg" radius="0" onClick={handleAddIngredient} disabled={!ingredient.trim()}>
            <IconPlus size="1em" />
          </ActionIcon>
        </Group>

        {ingredients.length > 0 && (
          <Box maw="80%" mt="sm" mb="xl">
            <Text mt="md" size="sm" fw={500}>
              Ingredients:
            </Text>
            <List pl="xl">
              {ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  <Group gap="xl">
                    <Text size="sm">{ingredient}</Text>

                    <ActionIcon variant="outline" size="sm" radius="0" onClick={() => handleRemoveIngredient(index)}>
                      <IconMinus size="1em" />
                    </ActionIcon>
                  </Group>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Textarea
          label="Recipe instructions"
          placeholder="Enter the instructions for preparation and implementation"
          minRows={3}
          maxRows={20}
          mb="sm"
          {...form.getInputProps("instructions")}
          required
        />

        <Flex gap="md" justify="space-between" align="flex-start" mb="sm">
          <TextInput
            label="Prep Time"
            placeholder="Preparation time in minutes"
            {...form.getInputProps("prepTimeMinutes")}
            style={{ flex: 1 }}
          />
          <TextInput
            label="Cook Time"
            placeholder="Cook time in minutes"
            {...form.getInputProps("cookTimeMinutes")}
            style={{ flex: 1 }}
          />
        </Flex>

        <Flex gap="md" justify="space-between" align="flex-start" mb="sm">
          <TextInput label="Servings" placeholder="Servings" {...form.getInputProps("servings")} style={{ flex: 1 }} />
          <TextInput
            label="Calories"
            placeholder="Calories per serving"
            {...form.getInputProps("caloriesPerServing")}
            style={{ flex: 1 }}
          />
        </Flex>

        <Flex gap="md" justify="space-between" align="flex-start" mb="sm">
          <TextInput
            label="Cuisine"
            placeholder="Nationality of the cuisine"
            {...form.getInputProps("cuisine")}
            style={{ flex: 1 }}
          />
          <Select
            label="Difficulty"
            placeholder="Please select the difficulty"
            data={["Easy", "Medium", "Hard", "Master Chef", "Michelin star"]}
            mb="sm"
            {...form.getInputProps("difficulty")}
            required
            style={{ flex: 1 }}
          />
        </Flex>

        <TagsInput
          label="Tags"
          placeholder="Please fill in the tags and press Enter"
          {...form.getInputProps("tags")}
          style={{ flex: 1 }}
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
          {isEdited ? "Update Recipe" : "Create Recipe"}
        </Button>

        {recipeNotification && (
          <Notification
            icon={<IconCircleCheckFilled size={24} />}
            title={` Recipe ${isEdited ? "Updated" : "Created"} Successful`}
            color="teal"
            mt="md"
            withCloseButton
            onClose={() => {
              setRecipeNotification(null);
              navigate("/recipes");
            }}
          >
            <Text>{recipeNotification.message}</Text>
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
