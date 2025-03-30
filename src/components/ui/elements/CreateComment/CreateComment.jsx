import { useForm } from "@mantine/form";
import {
  Title,
  Paper,
  Group,
  Text,
  Textarea,
  Button,
  Notification,
} from "@mantine/core";

import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useCreateItem } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import styles from "./CreateComment.module.scss";
import { useAuth } from "../../../../hooks/useAuth";

const schema = z.object({
  content: z
    .string()
    .min(2, { message: "Your comment must be at least 2 characters" }),
});

export default function CreateCommentForm({ article, onAddComment, parent }) {
  const form = useForm({
    initialValues: {
      content: "",
    },
    validate: zodResolver(schema),
  });

  const { getUserData } = useAuth();
  const user = getUserData();

  const { error: commentError, create } = useCreateItem(endpoints.comments);

  const handleSubmit = async (values) => {
    const credentials = {
      _postId: article?._id || parent?._postId,
      _parentId: parent?._id || null,
      // _authorId: user._id,
      content: values.content,
    };

    try {
      const result = await create(credentials);

      if (result) {
        const comment = {
          ...result,
          author: user,
        };
        onAddComment(comment);
        form.reset();
      }
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  return (
    <Paper p="md" mt="md" className={styles.form}>
      <Title size="h3" mb="md">
        Leave a comment
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group justify="space-between" wrap="nowrap" mb="md">
          {parent && (
            <Text size="sm" c="dimmed" mb="md">
              Replying to {parent.author?.firstName}
            </Text>
          )}
          <Textarea
            autosize
            minRows={2}
            maxRows={6}
            placeholder="Write your comment here..."
            {...form.getInputProps("content")}
            required
            className={styles.comment}
          />
        </Group>

        <Button
          type="submit"
          radius="0"
          mt="lg"
          tt="uppercase"
          disabled={!form.isValid()}
        >
          {parent ? "Post reply" : "Post comment"}
        </Button>

        {commentError && (
          <Notification color="red" mt="md" withCloseButton>
            {typeof commentError === "string"
              ? commentError
              : "Failed to post comment"}
          </Notification>
        )}
      </form>
    </Paper>
  );
}
