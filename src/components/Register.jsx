import { useState } from "react";

import { useForm } from "@mantine/form";
import {
  Modal,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Paper,
  Notification,
  Group,
} from "@mantine/core";

import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

const create = async (user) => {
  try {
    let response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

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

export default function RegisterForm({ opened, onClose, onAddUser }) {
  const [serverError, setServerError] = useState(null);

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

  const handleSubmit = (values) => {
    const user = {
      id: new Date().getTime(),
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      subscribe: values.subscribe,
      role: "user",
    };

    create(user).then((data) => {
      if (data.error) {
        setServerError(data.error.message);
      }
    });

    onAddUser(user);
    form.reset();
    onClose(false);
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <Paper p="lg" style={{ maxWidth: 400, margin: "auto" }}>
        <Title align="center" mb="md">
          Register
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {serverError && (
            <Notification color="red" mb="md">
              {serverError}
            </Notification>
          )}

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
        </form>
      </Paper>
    </Modal>
  );
}
