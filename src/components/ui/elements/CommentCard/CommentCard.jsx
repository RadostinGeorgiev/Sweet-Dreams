import { Card, Text, Group, Avatar, Stack, Button } from "@mantine/core";
import { IconArrowRight, IconHeart } from "@tabler/icons-react";

import styles from "./CommentCard.module.scss";

export function CommentCard({ comment, onReply }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(comment.createdAt));

  return (
    <Card withBorder p="md" radius="0" mb="sm">
      <Group align="start">
        <Avatar
          src={comment.author.image}
          alt={`${comment.author.firstName} ${comment.author.lastName}`}
          radius="0"
          size="xl"
        />
        <Stack gap={0} className={styles.content}>
          <Group gap="xs">
            <Text
              fw={500}
            >{`${comment.author.firstName} ${comment.author.lastName}`}</Text>
            <Text size="sm" c="dimmed">
              {formattedDate}
            </Text>
          </Group>
          <Text mt="xs">{comment.content}</Text>
          <Group mt="sm">
            <Button
              variant="subtle"
              size="compact-sm"
              rightSection={<IconArrowRight size={14} />}
              onClick={onReply}
            >
              Reply
            </Button>
            <Button
              variant="subtle"
              size="compact-sm"
              leftSection={<IconHeart size={14} />}
            >
              Like
            </Button>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
}
