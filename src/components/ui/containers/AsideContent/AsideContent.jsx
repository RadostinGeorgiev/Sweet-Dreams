import { Link } from "react-router";
import { Button, Card, Text } from "@mantine/core";
import { IconWriting } from "@tabler/icons-react";

import { useAuth } from "../../../../context/AuthContext";

import styles from "./AsideContent.module.scss";

export default function AsideContent() {
  const { isLogged } = useAuth();
  const loggedIn = isLogged();

  return (
    <Card padding="lg" radius="0">
      {loggedIn && (
        <Button
          variant="filled"
          size="compact-md"
          radius="0"
          mb="lg"
          leftSection={<IconWriting size={16} />}
          className={styles.button}
          component={Link}
          to="/blog/create"
        >
          Create Blog Post
        </Button>
      )}
      <Text weight={600} size="lg">
        Популярни категории
      </Text>
      <ul>
        <li>Веган рецепти</li>
        <li>Здравословно хранене</li>
        <li>Бързи закуски</li>
        <li>Десерти</li>
      </ul>
    </Card>
  );
}
