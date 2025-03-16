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
} from "@mantine/core";

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

export default function RegisterForm({ opened, onClose }) {
  const [serverError, setServerError] = useState(null);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      subscribe: false,
      role: "user",
    },
  });

  const handleSubmit = (values) => {
    const user = {
      email: values.email,
      password: values.password,
      subscribe: values.subscribe,
    };

    create(user).then((data) => {
      if (data.error) {
        setServerError(data.error.message);
      }
    });

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
