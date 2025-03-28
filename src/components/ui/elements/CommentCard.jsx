import { Card, Text, Group, Avatar, Stack, Button } from "@mantine/core";
import { IconArrowBack, IconHeart } from "@tabler/icons-react";

export function CommentCard({ comment, onReply }) {
  console.log("comment:", comment);

  return (
    <Card withBorder p="md" radius="0" mb="sm">
      <Group align="start">
        <Avatar
          src={comment.author.image}
          alt={`${comment.author.firstName} ${comment.author.lastName}`}
          radius="0"
          size="xl"
        />
        <Stack gap={0} style={{ flex: 1 }}>
          <Group gap="xs">
            <Text
              fw={500}
            >{`${comment.author.firstName} ${comment.author.lastName}`}</Text>
            <Text c="dimmed" size="sm">
              {new Date(comment.createdAt).toLocaleDateString()}
            </Text>
          </Group>
          <Text mt="xs">{comment.content}</Text>
          <Group mt="sm">
            <Button
              variant="subtle"
              size="compact-sm"
              leftSection={<IconArrowBack size={14} />}
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
