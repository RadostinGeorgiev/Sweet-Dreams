import { useState } from "react";
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
import { IconXboxXFilled, IconCircleCheckFilled } from "@tabler/icons-react";

import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useAuth } from "../../hooks/useAuth";

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
  const { register, registerError } = useAuth();
  const [userNotification, setUserNotification] = useState(null);

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

  const handleSubmit = async (values) => {
    const credentials = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      subscribe: values.subscribe,
      role: "user",
    };

    const registeredUser = await register(credentials);

    if (registeredUser) {
      const notification = {
        user: registeredUser,
        message: `Welcome ${registeredUser.firstName}!`,
      };
      setUserNotification(notification);
      onAddUser(registeredUser);
      form.reset();
    }
  };

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
          label="Email"
          placeholder="Enter your email"
          {...form.getInputProps("email")}
          required
        />

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

        <Button type="submit" fullWidth radius="0" mt="lg" tt="uppercase">
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
        {registerError && (
          <Notification
            icon={<IconXboxXFilled size={24} />}
            title="Error"
            color="red"
            mt="md"
          >
            {registerError}
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
