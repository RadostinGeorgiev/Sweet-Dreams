import { useParams } from "react-router";

import {
  Container,
  BackgroundImage,
  Stack,
  Group,
  Flex,
  Text,
  Button,
  Paper,
  Title,
  List,
  // Accordion,
  Badge,
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
import { useEffect, useState } from "react";

export default function RecipeDetails() {
  const [date, setDate] = useState();
  const { id } = useParams();

  console.log("id", id);
  console.log("endpoints", endpoints.recipes);

  const {
    data: recipe,
    loading: recipeLoading,
    error: recipeError,
  } = useGetItem(endpoints.recipes, id);

  const isoDate = new Date(1743530400000);
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short" });

  setDate({
    day: isoDate.getDate(),
    month: formatter.format(isoDate),
  });

  useEffect(() => {
    console.log("recipe:", recipe);
  }, []);

  if (recipeLoading) return <Loading />;
  if (recipeError) return <div>Error: {recipeError}</div>;

  if (recipe.length === 0) return;

  return (
    <section className="single-post spad">
      <BackgroundImage
        src={recipe.images[0]}
        h="70vh"
        radius="0"
        style={{
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "2rem",
        }}
      ></BackgroundImage>

      <Container size="md" py="xl">
        <Stack gap={0}>
          {/* Заглавие  */}
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
                post={recipe}
                size="large"
                variant="caption"
                className={`${styles["recipe-title"]}`}
              />
            </Flex>
          </Paper>

          {/* Описание */}
          {/* {recipe.content.map((paragraph, index) => (
            <Text size="md" mb="xl" key={index}>
              {paragraph}
            </Text>
          ))} */}

          {/* Мета информация */}
          <Paper radius={0} withBorder className={styles.options}>
            <Flex
              gap="xl"
              justify="center"
              align="center"
              direction="row"
              p="md"
            >
              <Group gap="xl">
                {/* Порции */}
                <Group gap="xs">
                  <IconUsers size={24} />
                  <div>
                    <Text fw={700} tt="uppercase" size="sm">
                      SERVES
                    </Text>
                    <Text size="sm" c="dimmed">
                      {recipe.servings}
                    </Text>
                  </div>
                </Group>

                {/* Време за подготовка */}
                <Group gap="xs">
                  <IconClock size={24} />
                  <div>
                    <Text fw={700} tt="uppercase" size="sm">
                      PREP TIME
                    </Text>
                    <Text size="sm" c="dimmed">
                      {`${recipe.prepTimeMinutes} minutes`}
                    </Text>
                  </div>
                </Group>

                {/* Време за готвене */}
                <Group gap="xs">
                  <IconClock size={24} />
                  <div>
                    <Text fw={700} tt="uppercase" size="sm">
                      COOK TIME
                    </Text>
                    <Text size="sm" c="dimmed">
                      {`${recipe.cookTimeMinutes} minutes`}
                    </Text>
                  </div>
                </Group>
              </Group>

              <Button
                variant="outline"
                radius={0}
                size="s"
                className={styles.button}
              >
                READ MORE
              </Button>
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

          {/* Стъпки за приготвяне */}
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

          {/* Допълнителни съвети */}
          <Paper p="lg" radius={0} withBorder>
            <Title order={4} mb="sm">
              Полезни съвети
            </Title>
            <Text c="dimmed">
              ✓ Използвайте прясно яйца за по-кремава текстура
            </Text>
            <Text c="dimmed">✓ Не преварвайте пастата</Text>
          </Paper>

          {/* Тагове */}
          <Group gap="sm">
            <Badge variant="light" radius="xs" color="orange">
              Италианска кухня
            </Badge>
            <Badge variant="light" radius="xs" color="teal">
              Бързи рецепти
            </Badge>
          </Group>
        </Stack>

        <Comments subject={recipe} />
      </Container>
    </section>
  );
}
