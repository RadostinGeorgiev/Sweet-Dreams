import { useForm } from "@mantine/form";
import {
  Modal,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Checkbox,
  Paper,
} from "@mantine/core";

import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

export default function LoginForm({ opened, onClose }) {
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
    onClose(false);
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <Paper p="lg" style={{ maxWidth: 400, margin: "auto" }}>
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
      </Paper>
    </Modal>
  );
}
