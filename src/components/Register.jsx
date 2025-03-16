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

export default function RegisterForm({ opened, onClose }) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      subscribe: false,
    },
  });

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    onClose(false);
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        withBorder
        style={{ maxWidth: 400, margin: "auto" }}
      >
        <Title align="center" mb="md">
          Register
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

          <Button type="submit" fullWidth mt="lg">
            Register
          </Button>
        </form>
      </Paper>
    </Modal>
  );
}
