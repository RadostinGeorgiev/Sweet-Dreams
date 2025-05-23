import { Link, useNavigate } from "react-router";

import { useForm } from "@mantine/form";
import { Paper, Title, TextInput, PasswordInput, Button, Checkbox, Text, Notification } from "@mantine/core";
import { IconXboxXFilled } from "@tabler/icons-react";

import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useAuth } from "../../context/AuthContext";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

export default function LoginForm() {
  const { login, loginError, setLoginError } = useAuth();

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values) => {
    const credentials = {
      email: values.email,
      password: values.password,
    };

    await login(credentials);
    navigate(-1);
  };

  return (
    <Paper withBorder shadow="lg" p="lg" mt="lg" style={{ maxWidth: 400, margin: "auto" }}>
      <Title align="center" mb="md">
        Login
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Email" placeholder="Enter your email" {...form.getInputProps("email")} required />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          mt="md"
          {...form.getInputProps("password")}
          required
        />

        <Checkbox label="Remember me" size="xs" mt="md" {...form.getInputProps("remember", { type: "checkbox" })} />

        <Button type="submit" fullWidth radius="0" mt="lg" tt="uppercase">
          Login
        </Button>

        {loginError && (
          <Notification
            icon={<IconXboxXFilled size={24} />}
            title="Error"
            color="red"
            mt="md"
            withCloseButton
            onClose={() => {
              setLoginError(null);
              navigate("/register");
            }}
          >
            {loginError}
          </Notification>
        )}
      </form>

      <Link to="/register" variant="body2">
        <Text mt="md" size="xs">
          Don&apos;t have an account? Sign Up
        </Text>
      </Link>
    </Paper>
  );
}
