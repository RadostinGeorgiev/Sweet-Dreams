import { Card, BackgroundImage, Stack, Title, Text, List } from "@mantine/core";

import styles from "./BlogCard.module.scss";

export default function BlogCard({ post }) {
  return (
    <Card shadow="md" radius="0">
      <Card.Section>
        <BackgroundImage src={post.image} className={styles["item-image"]}>
          <Stack
            align="center"
            justify="center"
            gap="0"
            className={styles.meta}
          >
            <Title order={2} fw={900}>
              {post.date.day}
            </Title>
            <Text size="sm" f1w={600} tt="uppercase" c="dimmed">
              {post.date.month}
            </Text>
          </Stack>
        </BackgroundImage>
      </Card.Section>
      <Card.Section className={styles["item-text"]}>
        <Text span size={"sm"} fw={700} tt="uppercase" className={styles.label}>
          {post.tags[0]}
        </Text>
        <Title order={3} fw={400} className={styles.title}>
          <a href="#">{post.title}</a>
        </Title>

        <List className={styles.widget}>
          <List.Item className={styles.property}>
            by
            <Text span className={styles.user}>
              {post.userId}
            </Text>
          </List.Item>
          <List.Item className={styles.property}>
            {post.minToRead} min read
          </List.Item>
          <List.Item className={styles.property}>
            {post.reviews.length} comments
          </List.Item>
        </List>

        <Text size="sm" m="md" lineClamp={3} className={styles.description}>
          {post.body}
        </Text>
      </Card.Section>
    </Card>
  );
}
