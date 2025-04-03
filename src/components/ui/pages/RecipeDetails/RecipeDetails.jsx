import { useParams } from "react-router";

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
} from "@tabler/icons-react";

import { useGetItem } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import PostTitle from "../../elements/PostTitle/PostTitle";
import MetaDate from "../../elements/MetaDate/MetaDate";
import Comments from "../../layout/Comments";

import styles from "./RecipeDetails.module.scss";
import Loading from "../../elements/Loading";

export default function RecipeDetails() {
  const { id } = useParams();

  const {
    data: recipe,
    loading: recipeLoading,
    error: recipeError,
  } = useGetItem(
    endpoints.recipes,
    id,
    null,
    "author=_ownerId:authors@_ownerId"
  );

  if (recipeLoading) return <Loading />;
  if (recipeError) return <div>Error: {recipeError}</div>;

  if (recipe.length === 0) return;

  const isoDate = new Date(recipe?._createdOn);
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short" });

  const date = {
    day: isoDate.getDate(),
    month: formatter.format(isoDate),
  };

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
            <Flex
              gap="md"
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <MetaDate
                date={date}
                size="large"
                color="--color-heading"
                background="--background-color-gray"
              />
              <PostTitle
                item={recipe}
                size="large"
                variant="caption"
                className={`${styles["recipe-title"]}`}
              />
            </Flex>
          </Paper>

          {recipe.description.map((paragraph, index) => (
            <Text size="md" mb="xl" key={index}>
              {paragraph}
            </Text>
          ))}

          <Paper radius={0} withBorder className={styles.options}>
            <Flex
              gap="xl"
              justify="center"
              align="center"
              direction="row"
              p="md"
            >
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
                  <Button
                    variant="outline"
                    size="compact-xs"
                    radius="0"
                    tt="uppercase"
                    className={styles.property}
                  >
                    {tag}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Group>
        </Stack>

        <Comments subject={recipe} />
      </Container>
    </section>
  );
}
