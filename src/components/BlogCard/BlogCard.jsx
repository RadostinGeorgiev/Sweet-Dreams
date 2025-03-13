import { Card, BackgroundImage, Stack, Title, Text, List } from "@mantine/core";

import styles from "./BlogCard.module.scss";

export default function BlogCard({ post }) {
  console.log(post);

  return (
    <Card shadow="xs" padding="md" radius="md">
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
            <Text size="sm" f1w={600} tt="uppercase">
              {post.date.month}
            </Text>
          </Stack>
        </BackgroundImage>
      </Card.Section>
      <Card.Section>
        <Text span size={"sm"} fw={700} tt={"uppercase"}>
          {post.tags[0]}
        </Text>
        <Title order={3} fw={400}>
          <a href="#">{post.title}</a>
        </Title>

        <List>
          <List.Item>by {post.userId}</List.Item>
          <List.Item>{post.minToRead} min read</List.Item>
          <List.Item>{post.reviews.length} comments</List.Item>
        </List>

        <Text size="sm" mt="xs" lineClamp={3}>
          {post.body}
        </Text>
      </Card.Section>
    </Card>
  );
}
