import { Button, Container, Group, Text, Title } from "@mantine/core";
import styles from "./NotFoundPage.module.scss";

export default function NotFoundPage() {
  return (
    <Container className={styles.root}>
      <div className={styles.label}>404</div>
      <Title className={styles.title}>You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center" className={styles.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}
