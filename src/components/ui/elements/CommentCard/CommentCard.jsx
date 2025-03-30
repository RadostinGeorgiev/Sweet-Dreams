import { Card, Text, Group, Avatar, Stack, Button } from "@mantine/core";
import { IconArrowRight, IconHeart } from "@tabler/icons-react";

import styles from "./CommentCard.module.scss";

export function CommentCard({
  comment,
  isReplying,
  onReply,
  onCancelReply,
  isLogged,
}) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(comment._createdOn));

  return (
    <Card radius="0" className={styles.card}>
      <Group align="start">
        <Avatar
          src={comment.author?.image}
          alt={`${comment.author?.firstName} ${comment.author?.lastName}`}
          radius="0"
          size="xl"
        />
        <Stack gap={0} className={styles.content}>
          <Group gap="xs">
            <Text
              fw={500}
            >{`${comment.author?.firstName} ${comment.author?.lastName}`}</Text>
            <Text size="sm" c="dimmed">
              {formattedDate}
            </Text>
          </Group>
          <Text mt="xs">{comment.content}</Text>

          {isLogged && (
            <Group mt="sm">
              <Button
                variant="subtle"
                size="compact-sm"
                rightSection={<IconArrowRight size={14} />}
                onClick={() => {
                  isReplying ? onCancelReply() : onReply(comment._id);
                }}
              >
                {isReplying ? "Cancel" : "Reply"}
              </Button>
              <Button
                variant="subtle"
                size="compact-sm"
                leftSection={<IconHeart size={14} />}
              >
                Like
              </Button>
            </Group>
          )}
        </Stack>
      </Group>
    </Card>
  );
}
