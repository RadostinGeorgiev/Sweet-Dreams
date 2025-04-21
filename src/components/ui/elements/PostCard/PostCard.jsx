import { Link } from "react-router";

import { Flex, Box, Group, Image, List, ListItem, Button, Title, Text } from "@mantine/core";
import { IconStar, IconEye, IconThumbUp, IconThumbDown, IconArrowRight } from "@tabler/icons-react";

import styles from "./PostCard.module.scss";

export default function PostCard({ data, layout = "vertical" }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(data._createdOn));

  return (
    <Flex
      shadow="md"
      gap="md"
      align="stretch"
      w="100%"
      pr="md"
      radius="0"
      className={`${styles.card} ${styles[layout]}`}
    >
      <Box className={styles["item-image"]}>
        <Image src={data?.images?.[0]} fit="cover" className={styles.image} />
        <Text span size="md" tt="uppercase" c="dimmed" className={styles.date}>
          {`${formattedDate} ――`}
        </Text>
      </Box>

      <Flex gap="0" className={styles["item-text"]}>
        <List className={styles.widget}>
          {data?.category.map((category, index) => (
            <ListItem key={index}>
              <Button
                variant="outline"
                size="compact-xs"
                radius="0"
                tt="uppercase"
                className={styles.property}
                component={Link}
                to={`/blog?where=category in ("${category}")`}
              >
                {category}
              </Button>
            </ListItem>
          ))}
        </List>

        <Title order={3} fw={400} className={styles.title}>
          {data.title}
        </Title>

        <Flex gap="xl" direction="row" justify="start" align="center" className={styles.widget}>
          <Group gap="xs">
            <Text size="sm" c="dimmed">
              by
            </Text>
            <Text size="sm" fw={700}>
              {` ${data.author?.firstName} ${data.author?.lastName}`}
            </Text>
          </Group>

          <Group gap="xs">
            <Text size="sm" fw={700}>
              {data.readingTimeMinutes}
            </Text>
            <Text size="sm" c="dimmed">
              minutes read
            </Text>
          </Group>
        </Flex>

        <Text size="md" lineClamp={3} className={styles.description}>
          {data.content}
        </Text>

        <Group justify="space-between">
          <Group c="dimmed">
            <Group gap="0">
              <IconStar size={20} className={styles.icon} />
              <Text size="sm">{data.rating.toFixed(2)}</Text>
            </Group>
            <Group gap="0">
              <IconEye size={20} className={styles.icon} />
              <Text size="sm">{data.views}</Text>
            </Group>
            <Group gap="0">
              <IconThumbUp size={20} className={styles.icon} />
              <Text size="sm">{data.reactions.likes}</Text>
            </Group>
            <Group gap="0">
              <IconThumbDown size={20} className={styles.icon} />
              <Text size="sm">{data.reactions.dislikes}</Text>
            </Group>
          </Group>
          <Button
            variant="transparent"
            radius="0"
            size="s"
            tt="uppercase"
            p="xs"
            rightSection={<IconArrowRight size={24} />}
            component={Link}
            to={`/blog/${data._id}`}
            className={styles.button}
          >
            Read more
          </Button>
        </Group>
      </Flex>
    </Flex>
  );
}
