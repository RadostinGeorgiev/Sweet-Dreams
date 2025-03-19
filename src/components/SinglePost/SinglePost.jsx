import { useEffect, useState } from "react";
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

import { services } from "../../services/item.service";
import { useFetch } from "../../hooks/useFetch";
import { endpoints } from "../../../config";

import PostTitle from "../elements/PostTitle/PostTitle";
import MetaDate from "../elements/MetaDate/MetaDate";

import styles from "./SinglePost.module.scss";

export default function SinglePost() {
  const { id } = useParams();

  const {
    data: post,
    loading: recipeLoading,
    error: recipeError,
  } = useFetch(services.getItemById, null, endpoints.recipes, id);

  const {
    data: author,
    loading: authorLoading,
    error: authorError,
  } = useFetch(services.getItemById, null, endpoints.users, id);

  if (recipeLoading || authorLoading) return <div>Loading...</div>;
  if (recipeError || authorError) return <div>Error: {recipeError}</div>;

  if (!post) return <p>Публикацията не е намерена</p>;

  if (post.length === 0) return;

  const date = { day: "01", month: "Jan" };

  return (
    <section className="single-post spad">
      <BackgroundImage
        src={post.image}
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
          <Paper shadow="lg" radius={0} className={styles["post-title"]}>
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
                post={post}
                author={author}
                size="large"
                variant="caption"
                className={`${styles["post-title"]}`}
              />
            </Flex>
          </Paper>

          {/* Описание */}
          {/* {post.content.map((paragraph, index) => (
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
                      {post.servings}
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
                      {`${post.prepTimeMinutes} minutes`}
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
                      {`${post.cookTimeMinutes} minutes`}
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

          {/* Ингредиенти */}
          <Paper p="lg" radius={0} withBorder>
            <Group mb="xs" gap="xs">
              <IconChecklist size={20} />
              <Title order={5} tt="uppercase">
                Ingredients
              </Title>
            </Group>

            <List size="sm" withPadding>
              {/* {post.ingredients.map((ingredient, index) => (
                <List.Item key={index}>
                  {`${ingredient.quantity} ${ingredient.product} (
                  ${ingredient.remark})`}
                </List.Item>
              ))} */}
              {post.ingredients.map((ingredient, index) => (
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
              {post.instructions.map((step, index) => (
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
      </Container>
    </section>
  );
}
