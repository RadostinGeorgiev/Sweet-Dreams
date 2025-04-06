import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

import { useForm } from "@mantine/form";
import {
  Title,
  Paper,
  Flex,
  Group,
  FileInput,
  Avatar,
  ActionIcon,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Notification,
} from "@mantine/core";
import { IconXboxXFilled, IconCircleCheckFilled, IconMinus } from "@tabler/icons-react";

import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useItemsCRUD } from "../../hooks/useItems";
import { endpoints } from "../../../config";
import { useAuth } from "../../context/AuthContext";

const schema = z
  .object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const { register, registerError } = useAuth();
  const [userNotification, setUserNotification] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const { itemError: authorError, createItem: createAuthor } = useItemsCRUD(endpoints.authors);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      subscribe: false,
      role: "user",
    },
    validate: zodResolver(schema),
  });

  const handleImageChange = async (file) => {
    if (!file) return;

    try {
      setUploadError(null);

      const tempUrl = URL.createObjectURL(file);
      setPreview(tempUrl);

      const storageRef = ref(storage, `avatars/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      setAvatarUrl(downloadUrl);
      setPreview(downloadUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError(error.message || "Failed to upload image");
      setPreview(null);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (values) => {
    const userCredentials = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      subscribe: values.subscribe,
      image: avatarUrl || `/images/avatars/${Math.floor(Math.random() * 30) + 1}.jpg`,
    };

    const registeredUser = await register(userCredentials);
    if (!registeredUser) {
      throw new Error("User registration failed - no ID returned");
    }

    const authorCredentials = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      image: registeredUser.image,
      role: "user",
    };

    const newAuthor = await createAuthor(authorCredentials);

    if (registeredUser && newAuthor) {
      const notification = {
        user: registeredUser,
        message: `Welcome ${registeredUser.firstName}!`,
      };
      setUserNotification(notification);
      form.reset();
    }
  };

  return (
    <Paper withBorder shadow="lg" p="lg" mt="lg" style={{ maxWidth: 400, margin: "auto" }}>
      <Flex justify="center" align="flex-start" mb="md">
        <FileInput
          accept="image/png,image/jpeg"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <Avatar
          src={preview}
          size={100}
          radius="50%"
          style={{ cursor: "pointer" }}
          onClick={() => fileInputRef.current?.click()}
        />
        <ActionIcon variant="outline" size="xs" radius="0" onClick={() => setPreview(null)}>
          <IconMinus size="0.6em" />
        </ActionIcon>
      </Flex>

      {uploadError && (
        <Text c="red" size="sm" ta="center" mb="md">
          {uploadError}
        </Text>
      )}

      <Title align="center" mb="md">
        Register
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group justify="space-between" wrap="nowrap" mb="md">
          <TextInput
            label="First Name"
            placeholder="Enter your first name"
            {...form.getInputProps("firstName")}
            required
          />
          <TextInput
            label="Last Name"
            placeholder="Enter your last name"
            {...form.getInputProps("lastName")}
            required
          />
        </Group>

        <TextInput label="Email" placeholder="Enter your email" {...form.getInputProps("email")} required />

        <PasswordInput
          label="Password"
          placeholder="Enter your password - min 6 chars"
          mt="md"
          {...form.getInputProps("password")}
          required
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          mt="md"
          {...form.getInputProps("confirmPassword")}
          required
        />

        <Checkbox
          label="I want to receive inspiration, marketing promotions and updates via email."
          size="xs"
          mt="md"
          {...form.getInputProps("subscribe", { type: "checkbox" })}
        />

        <Button type="submit" fullWidth radius="0" mt="lg" tt="uppercase" disabled={!form.isValid()}>
          Register
        </Button>

        {userNotification && (
          <Notification
            icon={<IconCircleCheckFilled size={24} />}
            title="Registration Successful"
            color="teal"
            mt="md"
            withCloseButton
            onClose={() => {
              setUserNotification(null);
              navigate("/");
            }}
          >
            <Text>{userNotification.message}</Text>
            <Text size="sm" mt="xs">
              Email: {userNotification.user.email}
            </Text>
          </Notification>
        )}
        {(registerError || authorError) && (
          <Notification
            icon={<IconXboxXFilled size={24} />}
            title="Error"
            color="red"
            mt="md"
            withCloseButton
            onClose={() => {
              navigate("/");
            }}
          >
            {registerError || authorError}
          </Notification>
        )}
      </form>
      <Link to="/login" variant="body2">
        <Text mt="md" size="xs">
          Already have an account? Sign in
        </Text>
      </Link>
    </Paper>
  );
}
