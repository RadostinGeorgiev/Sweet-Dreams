import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Container, Image, Title, Group, Stack, List, ListItem, Text, Button } from "@mantine/core";
import { IconStar, IconEye, IconThumbUp, IconThumbDown, IconPencilCog, IconTrash } from "@tabler/icons-react";

import { useAuth } from "../../../../context/AuthContext";
import { useItemsCRUD } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import Comments from "../../layout/Comments";
import Loading from "../../elements/Loading";

import styles from "./PostDetails.module.scss";

export default function PostDetails() {
  const { user, isAuthenticated } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formatedDate, setFormatedDate] = useState("");

  const {
    item: article,
    setItem: setArticle,
    itemLoading,
    changeLoading,
    itemError,
    changeError,
    getItem: getArticle,
    updateItem: updateArticle,
    deleteItem: deleteArticle,
  } = useItemsCRUD(endpoints.blog, {
    relations: "author=_ownerId:authors@_ownerId",
  });

  useEffect(() => {
    getArticle(id);
  }, []);

  useEffect(() => {
    if (!article?._createdOn) return;

    const date = new Date(article._createdOn);

    if (isNaN(date.getTime())) {
      console.warn("Invalid date:", article._createdOn);
      return;
    }

    setFormatedDate(
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(article?._createdOn))
    );
  }, [article?._id]);

  useEffect(() => {
    if (!article?._id) return;

    const updateViews = async () => {
      try {
        const result = await updateArticle(article._id, {
          views: article.views + 1,
        });
        setArticle(result);
      } catch (error) {
        console.error("View count update failed:", error);
      }
    };

    updateViews();
  }, [article?._id]);

  const calculateRating = (reactions) => {
    const total = reactions.likes + reactions.dislikes;
    return total > 0 ? Math.round(((6 * reactions.likes) / total) * 10) / 10 : 0;
  };

  const isOwner = user?._id === article?._ownerId;

  function handleEditClick() {
    navigate(`/blog/edit/${article._id}`, {
      state: { article },
    });
  }

  async function handleDeleteClick() {
    const result = await deleteArticle(id);
    console.log(`Article ${result.title} was deleted successfully`);
    navigate("/blog");
  }

  async function handleReaction(reaction) {
    const updatedReactions = {
      ...article.reactions,
      [reaction]: article.reactions[reaction] + 1,
    };

    const updatedRating = calculateRating(updatedReactions);
    const updatedData = { reactions: updatedReactions, rating: updatedRating };

    setArticle((prev) => ({ ...prev, ...updatedData }));

    try {
      const result = await updateArticle(id, updatedData);
      setArticle((prev) => ({ ...prev, ...result }));
    } catch (error) {
      setArticle((prev) => ({ ...prev }));
      console.error("Update failed:", error);
    }
  }

  const handleCommentAdded = useCallback(async (id) => {
    if (id !== article?._id) return;

    try {
      const result = await updateArticle(article._id, {
        reviewCount: article.reviewCount + 1,
      });

      setArticle((prev) => ({
        ...prev,
        reviewCount: result.reviewCount,
      }));
    } catch (error) {
      console.error("Reviews count update failed:", error);
    }
  }, []);

  if (itemLoading || changeLoading) return <Loading />;
  if (itemError || changeError) return <div>Error: {itemError || changeError}</div>;
  if (article?.length === 0) return;

  return (
    <section className="single-post spad">
      <Image src={article.images[0]} h="70vh" radius="0" />

      <Container size="md" py="xl">
        <Group justify="space-between">
          <Text span size="md" tt="uppercase" c="dimmed">
            {`${formatedDate}`}
          </Text>
          <List className={styles.widget}>
            {article.category.map((category, index) => (
              <ListItem key={index}>
                <Button variant="outline" size="compact-xs" radius="0" tt="uppercase" className={styles.property}>
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

        <Group justify="flex-end" gap="lg" c="dimmed">
          <Group gap="xs" className={styles.statistics}>
            <IconStar size={24} />
            <Text size="sm">{article.rating.toFixed(2)}</Text>
          </Group>
          <Group gap="xs" className={styles.statistics}>
            <IconEye size={24} />
            <Text size="sm">{article.views}</Text>
          </Group>
          <Button
            variant="subtle"
            size="compact-md"
            leftSection={<IconThumbUp size={18} />}
            onClick={() => handleReaction("likes")}
            className={styles.reactions}
            disabled={!isAuthenticated || isOwner}
          >
            {article.reactions.likes}
          </Button>
          <Button
            variant="subtle"
            size="compact-md"
            leftSection={<IconThumbDown size={18} />}
            onClick={() => handleReaction("dislikes")}
            className={styles.reactions}
            disabled={!isAuthenticated || isOwner}
          >
            {article.reactions.dislikes}
          </Button>
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

        <Comments subject={article} onCommentAdded={handleCommentAdded} />
      </Container>
    </section>
  );
}
