import { useNavigate, useParams } from "react-router";

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
  IconPencilCog,
  IconTrash,
  // IconArrowLeft,
  // IconArrowRight,
} from "@tabler/icons-react";

import { useDeleteItem, useGetItem } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import styles from "./PostDetails.module.scss";
import Comments from "../../layout/Comments";
import { useAuth } from "../../../../context/AuthContext";
import Loading from "../../elements/Loading";

export default function PostDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: article,
    loading: postLoading,
    error: postError,
  } = useGetItem(endpoints.blog, id, null, "author=_ownerId:authors@_ownerId");

  const { del: deleteArticle } = useDeleteItem(endpoints.blog);

  if (postLoading) return <Loading />;
  if (postError) return <div>Error: {postError}</div>;

  if (article.length === 0) return;

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(article._createdOn));

  const isOwner = user?._id === article?._ownerId;

  function handleEditClick() {
    console.log("Edit:", article);
    navigate(`/blog/edit/${article._id}`, {
      state: { article },
    });
  }

  async function handleDeleteClick() {
    const result = await deleteArticle(id);
    console.log(`Article ${result.title} was deleted successfully`);
    navigate("/blog");
  }

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

        {isOwner && (
          <Group justify="flex-end" gap="md" mt="xl">
            <Button
              variant="outline"
              radius="0"
              size="s"
              p="xs"
              color="blue"
              leftSection={<IconPencilCog size={24} />}
              className={styles.button}
              onClick={handleEditClick}
            >
              Edit
            </Button>
            <Button
              variant="filled"
              radius="0"
              size="s"
              p="xs"
              color="red"
              leftSection={<IconTrash size={24} />}
              className={styles.button}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </Group>
        )}

        <Comments subject={article} />
      </Container>
    </section>
  );
}
