import { useNavigate, Link } from "react-router";

import { useForm } from "@mantine/form";
import {
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Text,
} from "@mantine/core";

import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

export default function LoginForm() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    navigate("/");
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
        Login
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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

        <Checkbox
          label="Remember me"
          size="xs"
          mt="md"
          {...form.getInputProps("remember", { type: "checkbox" })}
        />

        <Button type="submit" fullWidth mt="lg" tt="uppercase">
          Login
        </Button>
      </form>

      <Link to="/register" variant="body2">
        <Text mt="md" size="xs">
          Don&apos;t have an account? Sign Up
        </Text>
      </Link>
    </Paper>
  );
}
