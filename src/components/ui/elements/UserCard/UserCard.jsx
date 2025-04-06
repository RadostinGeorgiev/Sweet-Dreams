import { Avatar, Card, Group, Text } from "@mantine/core";
import styles from "./UserCardImage.module.css";
import { IconAt } from "@tabler/icons-react";

export function UserCardImage({ user }) {
  return (
    <Card withBorder padding="xl" radius="md" className={styles.card}>
      <Card.Section
        h={140}
        style={{
          backgroundImage: `/images/blog/${
            Math.floor(Math.random() * 30) + 1
          }.jpg`,
        }}
      />
      <Avatar
        src={user.image}
        alt={user.firstName}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={styles.avatar}
      />
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {`${user.firstName} ${user.lastName}`}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {user.role}
      </Text>
      <Group wrap="nowrap" gap={10}>
        <IconAt stroke={1.5} size={16} className={styles.icon} />
        <Text fz="md" c="dimmed">
          {user.email}
        </Text>
      </Group>
    </Card>
  );
}
