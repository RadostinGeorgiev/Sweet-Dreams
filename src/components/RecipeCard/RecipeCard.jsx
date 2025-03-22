import {
  Flex,
  Box,
  Group,
  Image,
  Title,
  Text,
  Rating,
  Button,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

import styles from "./RecipeCard.module.scss";

export default function RecipeCard({ recipe, layout = "vertical" }) {
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
        <Image className={styles.image} src={recipe.images[0]} />
      </Box>

      <Flex gap="0" className={styles["item-text"]}>
        <Text size={"sm"} fw={700} tt="uppercase" className={styles.label}>
          {recipe.tags[0]}
        </Text>
        <Title order={3} fw={400} className={styles.title}>
          {recipe.name}
        </Title>
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
              Total time
            </Text>
            <Text size="sm" fw={700}>
              {`${
                Number(recipe.prepTimeMinutes) + Number(recipe.cookTimeMinutes)
              } minutes`}
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
        </Flex>
        <Text size="sm" lineClamp={2} className={styles.description}>
          {recipe.body}
        </Text>
        <Group justify="space-between">
          <Group>
            <Rating color="gray" count={6} defaultValue={recipe.rating} />
            <Text size="xs">({recipe.rating.toFixed(2)})</Text>
          </Group>
          <Button
            variant="outline"
            radius={0}
            size="s"
            tt="uppercase"
            p="xs"
            rightSection={<IconArrowRight size={24} />}
            className={styles.button}
          >
            Read more
          </Button>
        </Group>
      </Flex>
    </Flex>
  );
}
