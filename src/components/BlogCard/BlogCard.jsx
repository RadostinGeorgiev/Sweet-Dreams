import {
  Flex,
  Box,
  Group,
  Image,
  Stack,
  Title,
  Text,
  List,
  Rating,
} from "@mantine/core";

import styles from "./BlogCard.module.scss";

export default function BlogCard({ article, author, layout = "vertical" }) {
  const rating =
    1 +
    (article.reactions.likes /
      (article.reactions.likes + article.reactions.dislikes)) *
      5;
  return (
    <Flex
      shadow="md"
      gap="md"
      align="stretch"
      w="100%"
      p="md"
      radius="0"
      className={`${styles.card} ${styles[layout]}`}
    >
      <Box className={styles["item-image"]}>
        <Image className={styles.image} src={article.image} />
        <Stack align="center" justify="center" gap="0" className={styles.meta}>
          <Title order={2} fw={900}>
            {article.date.day}
          </Title>
          <Text size="sm" f1w={600} tt="uppercase" c="dimmed">
            {article.date.month}
          </Text>
        </Stack>
      </Box>

      <Flex className={styles["item-text"]}>
        <Text size={"sm"} fw={700} tt="uppercase" className={styles.label}>
          {article.tags[0]}
        </Text>
        <Title order={3} fw={400} className={styles.title}>
          <a href="#">{article.title}</a>
        </Title>
        <List className={styles.widget}>
          <List.Item className={styles.property}>
            by
            <Text span className={styles.user}>
              {` ${author?.firstName} ${author?.lastName}`}
            </Text>
          </List.Item>
          <List.Item className={styles.property}>
            {article.minToRead} min read
          </List.Item>
          <List.Item className={styles.property}>
            {article.reviews.length} comments
          </List.Item>
        </List>
        <Text size="sm" lineClamp={2} className={styles.description}>
          {article.body}
        </Text>
        <Group>
          <Rating defaultValue={rating} />{" "}
          <Text size="xs">({rating.toFixed(2)})</Text>
        </Group>
      </Flex>
    </Flex>
  );
}
