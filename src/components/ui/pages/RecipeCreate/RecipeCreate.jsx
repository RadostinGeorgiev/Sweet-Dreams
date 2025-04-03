import { useState } from "react";
import { useNavigate } from "react-router";
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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconCircleCheckFilled,
  IconPlus,
  IconMinus,
  IconXboxXFilled,
} from "@tabler/icons-react";

import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useCreateItem } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const schema = z.object({
  name: z.string().min(6, {
    message: "The name of the recipe must be at least 6 characters",
  }),
  description: z.string().min(6, {
    message: "The description of the recipe must be at least 6 characters",
  }),
  imagesFiles: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      "File must be less than 1MB"
    )
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .png, .webp allowed"
    ),
});

export default function RecipeCreateForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [recipeNotification, setRecipeNotification] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      category: [],
      description: [],
      ingredients: [],
      instructions: [],
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      servings: 0,
      caloriesPerServing: 0,
      cuisine: "",
      difficulty: "",
      tags: [],

      imagesFiles: [],
    },
    validate: zodResolver(schema),
  });

  const { error: recipeError, create: createRecipe } = useCreateItem(
    endpoints.recipes
  );

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient("");
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleImageChange = (files) => {
    form.setFieldValue("imagesFiles", files || []);
    if (files) {
      setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
    } else {
      setPreviewUrls([]);
    }
  };

  const uploadImages = async (files) => {
    return Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      })
    );
  };

  const handleSubmit = async (values) => {
    setIsUploading(true);

    try {
      const imagesUrls = await uploadImages(values.imagesFiles);

      const data = {
        name: values.name,
        category: values.category,
        description: values.description
          .split("\n")
          .filter((p) => p.trim() !== ""),
        ingredients: ingredients,
        instructions: values.instructions
          .split("\n")
          .filter((p) => p.trim() !== ""),

        prepTimeMinutes: Number(values.prepTimeMinutes),
        cookTimeMinutes: Number(values.cookTimeMinutes),
        servings: Number(values.servings),
        caloriesPerServing: Number(values.caloriesPerServing),
        cuisine: values.cuisine,
        difficulty: values.difficulty,
        tags: values.tags || null,
        images: imagesUrls,
        rating: 0,
        views: 0,
        reactions: {
          likes: 0,
          dislikes: 0,
        },
        reviewCount: 0,
      };

      console.log(data);

      const newRecipe = await createRecipe(data);

      if (newRecipe) {
        const notification = {
          title: "Successfuly create",
          message: `The recipe ${newRecipe.name} was created sucessfuly!`,
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
    <Paper
      withBorder
      shadow="lg"
      p="lg"
      mt="lg"
      style={{ maxWidth: 600, margin: "auto", position: "relative" }}
    >
      <LoadingOverlay visible={isUploading} />
      <Title align="center" mb="md">
        Create Recipe
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Recipe Name"
          placeholder="Enter recipe name"
          mb="sm"
          {...form.getInputProps("name")}
          required
        />

        <MultiSelect
          label="Categories"
          placeholder="Please select categories"
          data={[
            "Cakes & Cupcakes",
            "Cookies & Bars",
            "Pies & Tarts",
            "Puddings & Custards",
            "Frozen Treats",
          ]}
          mb="sm"
          {...form.getInputProps("category")}
          required
          style={{ flex: 1 }}
        />

        <Textarea
          label="Recipe description"
          placeholder="Enter the short description of the recipe"
          minRows={2}
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
          <ActionIcon
            variant="filled"
            size="lg"
            radius="0"
            onClick={handleAddIngredient}
            disabled={!ingredient.trim()}
          >
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

                    <ActionIcon
                      variant="outline"
                      size="sm"
                      radius="0"
                      onClick={() => handleRemoveIngredient(index)}
                    >
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
          minRows={2}
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
          <TextInput
            label="Servings"
            placeholder="Servings"
            {...form.getInputProps("servings")}
            style={{ flex: 1 }}
          />
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
          value={form.values.imagesFiles}
          onChange={handleImageChange}
          error={form.errors.imagesFiles}
        />
        {previewUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`Preview ${index + 1}`}
            height={300}
            fit="cover"
            mb="sm"
          />
        ))}

        <Button
          type="submit"
          fullWidth
          radius="0"
          mt="lg"
          tt="uppercase"
          disabled={!form.isValid()}
        >
          Create Recipe
        </Button>

        {recipeNotification && (
          <Notification
            icon={<IconCircleCheckFilled size={24} />}
            title="Create Article Successful"
            color="teal"
            mt="md"
            withCloseButton
            onClose={() => {
              setRecipeNotification(null);
              navigate("/blog");
            }}
          >
            <Text>{recipeNotification.message}</Text>
          </Notification>
        )}
        {recipeError && (
          <Notification
            icon={<IconXboxXFilled size={24} />}
            title="Error"
            color="red"
            mt="md"
          >
            {recipeError}
          </Notification>
        )}
      </form>
    </Paper>
  );
}
