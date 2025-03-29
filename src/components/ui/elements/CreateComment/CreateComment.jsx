import { useEffect } from "react";

import { useForm } from "@mantine/form";
import {
  Title,
  Paper,
  Textarea,
  Button,
  Notification,
  Group,
} from "@mantine/core";

import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useFetch } from "../../../../hooks/useFetch";
import { authServices } from "../../../../services/auth.service";

import styles from "./CreateComment.module.scss";

const schema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Your comment must be at least 2 characters" }),
});

export default function CreateCommentForm({ onAddComment }) {
  const form = useForm({
    initialValues: {
      content: "",
    },
    validate: zodResolver(schema),
  });

  const {
    data: comment,
    error: commentError,
    execute: createComment,
  } = useFetch(authServices.register);

  const handleSubmit = async (values) => {
    const credentials = {
      _postId: "5",
      _parentId: null,
      _authorId: "8",
      content: values.content,
    };
    try {
      await createComment(credentials);
    } catch (error) {
      console.error("Failed to create the comment:", error);
    }
  };

  useEffect(() => {
    if (comment) {
      console.log("The comment was created successfully:", comment);
      onAddComment(comment);
      form.reset();
    }
  }, [comment]);

  return (
    <Paper p="md" mt="md" className={styles.form}>
      <Title size="h3" mb="md">
        Leave a comment
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group justify="space-between" wrap="nowrap" mb="md">
          <Textarea
            autosize
            minRows={2}
            placeholder="Comment"
            {...form.getInputProps("content")}
            required
            className={styles.comment}
          />
        </Group>

        <Button type="submit" radius="0" mt="lg" tt="uppercase">
          Post comment
        </Button>

        {commentError && (
          <Notification color="red" mt="md">
            {commentError}
          </Notification>
        )}
      </form>
    </Paper>
  );
}
