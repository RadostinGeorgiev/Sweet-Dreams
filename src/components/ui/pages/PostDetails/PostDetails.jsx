import { useParams } from "react-router";

import {
  Container,
  Image,
  Title,
  Group,
  Stack,
  List,
  ListItem,
  Text,
  Button,
} from "@mantine/core";
import {
  IconStar,
  IconEye,
  IconThumbUp,
  IconThumbDown,
  // IconArrowLeft,
  // IconArrowRight,
} from "@tabler/icons-react";

import { useGetItem } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import styles from "./PostDetails.module.scss";
import Comments from "../../layout/Comments";

export default function PostDetails() {
  const { id } = useParams();

  const {
    data: article,
    loading: postLoading,
    error: postError,
  } = useGetItem(endpoints.blog, id);

  if (postLoading) return <div>Loading...</div>;
  if (postError) return <div>Error: {postError}</div>;

  if (article.length === 0) return;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(article.createdAt));

  // function handlePreviousClick() {
  //   console.log(article._id);
  // }

  // function handleNextClick() {
  //   console.log(article._id);
  // }

  return (
    <section className="single-post spad">
      <Image src={article.images[0]} h="70vh" radius="0" />

      <Container size="md" py="xl">
        <Group justify="space-between">
          <Text span size="md" tt="uppercase" c="dimmed">
            {`${formattedDate}`}
          </Text>
          <List className={styles.widget}>
            {article.category.map((category, index) => (
              <ListItem key={index}>
                <Button
                  variant="outline"
                  size="compact-xs"
                  radius="0"
                  tt="uppercase"
                  className={styles.property}
                >
                  {category}
                </Button>
              </ListItem>
            ))}
          </List>
        </Group>

        <Title order={3} fw={600} mt="lg" className={styles.title}>
          {article.title}
        </Title>

        <Stack gap={0} mt="md">
          {/* Описание */}
          {article.content.map((paragraph, index) => (
            <Text size="md" mb="lg" key={index}>
              {paragraph}
            </Text>
          ))}
        </Stack>

        <Group justify="flex-end" gap="md" c="dimmed">
          <Group gap="0">
            <IconStar size={24} className={styles.icon} />
            <Text size="sm">{article.rating.toFixed(2)}</Text>
          </Group>
          <Group gap="0">
            <IconEye size={24} className={styles.icon} />
            <Text size="sm">{article.views}</Text>
          </Group>
          <Group gap="0">
            <IconThumbUp size={24} className={styles.icon} />
            <Text size="sm">{article.reactions.likes}</Text>
          </Group>
          <Group gap="0">
            <IconThumbDown size={24} className={styles.icon} />
            <Text size="sm">{article.reactions.dislikes}</Text>
          </Group>
        </Group>

        {/* <Group justify="space-between" mt="xl">
          <Button
            variant="transparent"
            radius="0"
            size="s"
            p="xs"
            leftSection={<IconArrowLeft size={24} />}
            className={styles.button}
            onClick={handlePreviousClick}
          >
            Previous
          </Button>
          <Button
            variant="transparent"
            radius="0"
            size="s"
            p="xs"
            rightSection={<IconArrowRight size={24} />}
            className={styles.button}
            onClick={handleNextClick}
          >
            Go to Next
          </Button>
        </Group> */}

        <Comments article={article} />
      </Container>
    </section>
  );
}
