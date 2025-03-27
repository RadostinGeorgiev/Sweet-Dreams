import { Card, Text, Group, Avatar, Stack, Button } from "@mantine/core";
import { IconArrowBack, IconHeart } from "@tabler/icons-react";

export function Comment({ author, content, createdAt, onReply }) {
  return (
    <Card withBorder p="md" radius="md" mb="sm">
      <Group align="start">
        <Avatar radius="xl" size="sm" color="blue">
          {author.charAt(0)}
        </Avatar>
        <Stack gap={0} style={{ flex: 1 }}>
          <Group gap="xs">
            <Text fw={500}>{author}</Text>
            <Text c="dimmed" size="sm">
              {new Date(createdAt).toLocaleDateString()}
            </Text>
          </Group>
          <Text mt="xs">{content}</Text>
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
