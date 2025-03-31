import {
  Button,
  TextInput,
  MultiSelect,
  Paper,
  Title,
  TagsInput,
  Textarea,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
// import { IconCircleCheckFilled } from "@tabler/icons-react";

import { zodResolver } from "mantine-form-zod-resolver";
// import { Link } from "react-router";
import { z } from "zod";

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
    .refine((file) => file.size <= MAX_FILE_SIZE, "The file must be less 1MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "The supported formats are .jpg, .png and .webp"
    )
    .optional(),
  image: z.string().optional(),
});

export default function PostCreateForm() {
  const form = useForm({
    initialValues: {
      title: "",
      category: [],
      tags: [],
      content: "",
      image: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values) => {
    const postData = {
      title: values.title,
      category: values.category,
      tags: values.tags || null,
      content: values.content.split("\n").filter((p) => p.trim() !== ""),
      readingTimeMinutes: Math.ceil(
        values.content.trim().split(/\s+/).filter(Boolean).length / 150
      ),
      image: `/images/blog/${Math.floor(Math.random() * 30) + 1}.jpg`,
      rating: 0,
      views: 0,
      reactions: {
        likes: 0,
        dislikes: 0,
      },
      reviewCount: 0,
    };

    console.log(postData);

    // const registeredUser = await register(userCredentials);
    // if (!registeredUser) {
    //   throw new Error("User registration failed - no ID returned");
    // }
    // const authorCredentials = {
    //   firstName: values.firstName,
    //   lastName: values.lastName,
    //   email: values.email,
    //   image: registeredUser.image,
    //   role: "user",
    // };
    // const newAuthor = await createAuthor(authorCredentials);
    // if (registeredUser && newAuthor) {
    //   const notification = {
    //     user: registeredUser,
    //     message: `Welcome ${registeredUser.firstName}!`,
    //   };
    //   setUserNotification(notification);
    //   onAddUser(registeredUser);
    //   form.reset();
    // }
  };

  return (
    <Paper
      withBorder
      shadow="lg"
      p="lg"
      mt="lg"
      style={{ maxWidth: 600, margin: "auto" }}
    >
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

        {/* {userNotification && (
          <Notification
            icon={<IconCircleCheckFilled size={24} />}
            title="Registration Successful"
            color="teal"
            mt="md"
            withCloseButton
            onClose={() => {
            //   setUserNotification(null);
            //   navigate("/");
            }}
          >
            <Text>{userNotification.message}</Text>
            <Text size="sm" mt="xs">
              Email: {userNotification.user.email}
            </Text>
          </Notification>
        )} */}
        {/* {(registerError || authorError) && (
          <Notification
            icon={<IconXboxXFilled size={24} />}
            title="Error"
            color="red"
            mt="md"
          >
            {registerError || authorError}
          </Notification>
        )} */}
      </form>
    </Paper>
  );
}
