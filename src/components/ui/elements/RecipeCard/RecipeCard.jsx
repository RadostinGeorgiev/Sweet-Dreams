import { Link } from "react-router";

import {
  Flex,
  Box,
  Group,
  Image,
  Title,
  List,
  ListItem,
  Text,
  Button,
} from "@mantine/core";
import { IconStar, IconArrowRight } from "@tabler/icons-react";

import styles from "./RecipeCard.module.scss";

export default function RecipeCard({
  recipe,
  layout = "vertical",
  size = "large",
}) {
  return (
    <Flex
      shadow="md"
      gap="md"
      align="stretch"
      w="100%"
      p="xs"
      radius="0"
      className={`${styles.card} ${styles[layout]}`}
    >
      <Box className={styles["item-image"]}>
        <Image src={recipe.images[0]} fit="cover" className={styles.image} />
      </Box>

      <Flex gap="0" className={styles["item-text"]}>
        {size !== "small" && (
          <List className={styles.widget}>
            {recipe.category.map((category, index) => (
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
        )}

        <Title order={3} fw={400} className={styles.title}>
          {recipe.name}
        </Title>

        {size === "large" && (
          <Flex
            gap="xl"
            direction="row"
            justify="space-between"
            align="center"
            className={styles.widget}
          >
            <Group gap="xs">
              <Text tt="uppercase" size="sm" c="dimmed">
                Difficulty
              </Text>
              <Text size="sm" fw={700}>
                {recipe.difficulty}
              </Text>
            </Group>

            <Group gap="xs">
              <Text tt="uppercase" size="sm" c="dimmed">
                Serves
              </Text>
              <Text size="sm" fw={700}>
                {recipe.servings}
              </Text>
            </Group>

            <Group gap="xs">
              <Text tt="uppercase" size="sm" c="dimmed">
                Calories per serving
              </Text>
              <Text size="sm" fw={700}>
                {`${Number(recipe.caloriesPerServing)} kcal`}
              </Text>
            </Group>
          </Flex>
        )}

        {size !== "small" && (
          <Flex
            gap="xl"
            direction="row"
            justify="flex-start"
            align="center"
            className={styles.widget}
          >
            <Group gap="xs">
              <Text tt="uppercase" size="sm" c="dimmed">
                Preparation
              </Text>
              <Text size="sm" fw={700}>
                {recipe.prepTimeMinutes}
              </Text>
            </Group>

            <Group gap="xs">
              <Text tt="uppercase" size="sm" c="dimmed">
                Cooking time
              </Text>
              <Text size="sm" fw={700}>
                {`${Number(recipe.cookTimeMinutes)} minutes`}
              </Text>
            </Group>
          </Flex>
        )}

        <Text size="md" lineClamp={3} className={styles.description}>
          {recipe.description}
        </Text>

        <Group justify="space-between">
          <Group c="dimmed">
            <IconStar size={20} className={styles.icon} />
            <Text size="sm">{recipe.rating.toFixed(2)}</Text>
          </Group>
          <Button
            variant="outline"
            radius="0"
            size="s"
            tt="uppercase"
            p="xs"
            rightSection={<IconArrowRight size={24} />}
            component={Link}
            to={`/recipes/${recipe._id}`}
            className={styles.button}
          >
            Read more
          </Button>
        </Group>
      </Flex>
    </Flex>
  );
}
