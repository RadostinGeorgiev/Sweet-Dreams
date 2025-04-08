import { useNavigate, useParams } from "react-router";

import {
  Container,
  BackgroundImage,
  Stack,
  Group,
  Flex,
  Text,
  Paper,
  Title,
  List,
  // Accordion,
  ListItem,
  Button,
} from "@mantine/core";

import {
  IconClock,
  IconUsers,
  IconChecklist,
  IconListNumbers,
  IconPencilCog,
  IconTrash,
  IconStar,
  IconEye,
  IconThumbUp,
  IconThumbDown,
} from "@tabler/icons-react";

import { useAuth } from "../../../../context/AuthContext";
import { useItemsCRUD } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import PostTitle from "../../elements/PostTitle/PostTitle";
import MetaDate from "../../elements/MetaDate/MetaDate";
import Loading from "../../elements/Loading";
import Comments from "../../layout/Comments";

import styles from "./RecipeDetails.module.scss";
import { useCallback, useEffect, useState } from "react";

export default function RecipeDetails() {
  const { user, isAuthenticated } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formatedDate, setFormatedDate] = useState("");

  const {
    item: recipe,
    setItem: setRecipe,
    itemLoading,
    changeLoading,
    itemError,
    changeError,
    getItem: getRecipe,
    updateItem: updateRecipe,
    deleteItem: deleteRecipe,
  } = useItemsCRUD(endpoints.recipes, {
    relations: "author=_ownerId:authors@_ownerId",
  });

  useEffect(() => {
    getRecipe(id);
  }, []);

  useEffect(() => {
    if (!recipe?._createdOn) return;

    const isoDate = new Date(recipe._createdOn);
    if (isNaN(isoDate.getTime())) {
      console.warn("Invalid date:", recipe._createdOn);
      return;
    }

    setFormatedDate(
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(isoDate)
    );
  }, [recipe?._createdOn]);

  useEffect(() => {
    if (!recipe?._id) return;

    const updateViews = async () => {
      try {
        const result = await updateRecipe(recipe._id, {
          views: recipe.views + 1,
        });
        setRecipe(result);
      } catch (error) {
        console.error("View count update failed:", error);
      }
    };

    updateViews();
  }, [recipe?._id]);

  const calculateRating = (reactions) => {
    const total = reactions.likes + reactions.dislikes;
    return total > 0 ? Math.round(((6 * reactions.likes) / total) * 10) / 10 : 0;
  };

  const isOwner = user?._id === recipe?._ownerId;

  function handleEditClick() {
    navigate(`/recipes/edit/${recipe._id}`, {
      state: { recipe },
    });
  }

  async function handleDeleteClick() {
    const result = await deleteRecipe(id);
    console.log(`Recipe ${result.title} was deleted successfully`);
    navigate("/recipes");
  }

  async function handleReaction(reaction) {
    const updatedReactions = {
      ...recipe.reactions,
      [reaction]: recipe.reactions[reaction] + 1,
    };

    const updatedRating = calculateRating(updatedReactions);
    const updatedData = { reactions: updatedReactions, rating: updatedRating };

    setRecipe((prev) => ({ ...prev, ...updatedData }));

    try {
      const result = await updateRecipe(id, updatedData);
      setRecipe((prev) => ({ ...prev, ...result }));
    } catch (error) {
      setRecipe((prev) => ({ ...prev }));
      console.error("Update failed:", error);
    }
  }

  const handleCommentAdded = useCallback(
    async (id) => {
      if (id !== recipe?._id) return;

      try {
        const result = await updateRecipe(recipe._id, {
          reviewCount: recipe.reviewCount + 1,
        });

        setRecipe((prev) => ({
          ...prev,
          reviewCount: result.reviewCount,
        }));
      } catch (error) {
        console.error("Reviews count update failed:", error);
      }
    },
    [recipe, updateRecipe]
  );

  if (itemLoading || changeLoading) return <Loading />;
  if (itemError || changeError) return <div>Error: {itemError || changeError}</div>;
  if (recipe?.length === 0) return;

  return (
    <section className="single-post spad">
      <BackgroundImage
        src={recipe.images[0]}
        h="70vh"
        radius="0"
        style={{
          position: "relative",
          backgroundSize: "initial",
          backgroundPosition: "center",
          padding: "2rem",
        }}
      />

      <Container size="md" py="xl">
        <Stack gap={0}>
          <Paper shadow="lg" radius={0} className={styles["recipe-title"]}>
            <Flex gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
              <MetaDate date={formatedDate} size="large" color="--color-heading" background="--background-color-gray" />
              <PostTitle item={recipe} size="large" variant="caption" className={`${styles["recipe-title"]}`} />
            </Flex>
          </Paper>

          {recipe.description.map((paragraph, index) => (
            <Text size="md" mb="xl" key={index}>
              {paragraph}
            </Text>
          ))}

          <Paper radius={0} withBorder className={styles.options}>
            <Flex gap="xl" justify="center" align="center" direction="row" p="md">
              <Group gap="xl">
                <Group gap="xs">
                  <IconUsers size={24} />
                  <div>
                    <Text fw={700} tt="uppercase" size="sm">
                      Serves
                    </Text>
                    <Text size="sm" c="dimmed">
                      {recipe.servings}
                    </Text>
                  </div>
                </Group>

                <Group gap="xs">
                  <IconClock size={24} />
                  <div>
                    <Text fw={700} tt="uppercase" size="sm">
                      Prep time
                    </Text>
                    <Text size="sm" c="dimmed">
                      {`${recipe.prepTimeMinutes} minutes`}
                    </Text>
                  </div>
                </Group>

                <Group gap="xs">
                  <IconClock size={24} />
                  <div>
                    <Text fw={700} tt="uppercase" size="sm">
                      Cook time
                    </Text>
                    <Text size="sm" c="dimmed">
                      {`${recipe.cookTimeMinutes} minutes`}
                    </Text>
                  </div>
                </Group>
              </Group>
            </Flex>
          </Paper>

          <Paper p="lg" radius={0} withBorder>
            <Group mb="xs" gap="xs">
              <IconChecklist size={20} />
              <Title order={5} tt="uppercase">
                Ingredients
              </Title>
            </Group>

            <List size="sm" withPadding>
              {/* {recipe?.ingredients?.map((ingredient, index) => (
                <List.Item key={index}>
                  {`${ingredient.quantity} ${ingredient.product} (
                  ${ingredient.remark})`}
                </List.Item>
              ))} */}
              {recipe?.ingredients.map((ingredient, index) => (
                <List.Item key={index}>{ingredient}</List.Item>
              ))}
            </List>
          </Paper>

          <Paper p="lg" radius={0} withBorder>
            <Group mb="xs" gap="xs">
              <IconListNumbers size={20} />
              <Title order={5} tt="uppercase">
                Directions
              </Title>
            </Group>

            {/* <Accordion variant="contained" multiple>
              {post.instructions.map((step, index) => (
                <Accordion.Item key={index} value={`step${index + 1}`}>
                  <Accordion.Control>
                    {index + 1}: {step.step}
                  </Accordion.Control>

                  <Accordion.Panel>
                    <Text size="sm">{step.description}</Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion> */}
            <List size="sm" type="ordered" withPadding>
              {recipe.instructions.map((step, index) => (
                <List.Item key={index}>{step}</List.Item>
              ))}
            </List>
          </Paper>

          <Group justify="space-between">
            <List className={styles.widget}>
              {recipe.tags.map((tag, index) => (
                <ListItem key={index}>
                  <Button variant="outline" size="compact-xs" radius="0" tt="uppercase" className={styles.property}>
                    {tag}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Group>
        </Stack>

        <Group justify="flex-end" gap="lg" c="dimmed">
          <Group gap="xs" className={styles.statistics}>
            <IconStar size={24} />
            <Text size="sm">{recipe.rating.toFixed(2)}</Text>
          </Group>
          <Group gap="xs" className={styles.statistics}>
            <IconEye size={24} />
            <Text size="sm">{recipe.views}</Text>
          </Group>
          <Button
            variant="subtle"
            size="compact-md"
            leftSection={<IconThumbUp size={18} />}
            onClick={() => handleReaction("likes")}
            className={styles.reactions}
            disabled={!isAuthenticated || isOwner}
          >
            {recipe.reactions.likes}
          </Button>
          <Button
            variant="subtle"
            size="compact-md"
            leftSection={<IconThumbDown size={18} />}
            onClick={() => handleReaction("dislikes")}
            className={styles.reactions}
            disabled={!isAuthenticated || isOwner}
          >
            {recipe.reactions.dislikes}
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

        <Comments subject={recipe} onCommentAdded={handleCommentAdded} />
      </Container>
    </section>
  );
}
