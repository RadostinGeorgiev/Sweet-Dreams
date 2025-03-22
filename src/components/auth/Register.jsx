import { useEffect } from "react";
import { useNavigate, Link } from "react-router";

import { useForm } from "@mantine/form";
import {
  Title,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Notification,
  Group,
  Text,
} from "@mantine/core";

import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useFetch } from "../../hooks/useFetch";
import { authServices } from "../../services/auth.service";
import { endpoints } from "../../../config";

const schema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm({ onAddUser }) {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      subscribe: false,
      role: "user",
    },
    validate: zodResolver(schema),
  });

  const {
    data: user,
    error: userError,
    execute,
  } = useFetch(
    authServices.register,
    { dataKey: null, immediate: false },
    endpoints.register
  );

  const handleSubmit = async (values) => {
    const credentials = {
      // id: new Date().getTime(),
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      password: values.password,
      subscribe: values.subscribe,
      role: "user",
    };
    try {
      await execute(credentials);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User registered successfully:", user);
      onAddUser(user);
      form.reset();
      navigate("/");
    }
  }, [user]);

  return (
    <Paper
      withBorder
      shadow="lg"
      p="lg"
      mt="lg"
      style={{ maxWidth: 400, margin: "auto" }}
    >
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

        <TextInput
          label="Username"
          placeholder="Enter your username"
          {...form.getInputProps("username")}
          required
        />

        <TextInput
          label="Email"
          placeholder="Enter your email"
          {...form.getInputProps("email")}
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
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

        <Button type="submit" fullWidth mt="lg" tt="uppercase">
          Register
        </Button>

        {userError && (
          <Notification color="red" mt="md">
            {userError}
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
