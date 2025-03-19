import { Box, Title, Text, Divider, List } from "@mantine/core";

import { IconUserEdit, IconClock, IconMessage } from "@tabler/icons-react";
import styles from "./PostTitle.module.scss";

export default function PostTitle({ post, author, variant, size }) {
  return (
    <Box className={`${styles.text} ${styles[variant]} ${styles[size]}`}>
      <Text span size={"sm"} fw={700} tt={"uppercase"} className={styles.label}>
        {post.cuisine}
      </Text>
      <Title order={4} fw={400} className={`${styles.title}`}>
        {post.name}
      </Title>

      <List c="dimmed" className={styles.widget}>
        <List.Item icon={<IconUserEdit size={16} />}>
          <Text>{`${author?.firstName} ${author?.lastName}`}</Text>
        </List.Item>
        <Divider orientation="vertical" />
        <List.Item icon={<IconClock size={16} />}>
          <Text>{post.prepTimeMinutes} min read</Text>
        </List.Item>
        <Divider orientation="vertical" />
        <List.Item icon={<IconMessage size={16} />}>
          <Text>{post.reviewCount} Comments</Text>
        </List.Item>
      </List>
    </Box>
  );
}
