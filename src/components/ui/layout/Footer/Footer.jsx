import { Container, Flex, Group, Box, Text, ActionIcon } from "@mantine/core";
import styles from "./Footer.module.scss";
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Container size="xl" pt="sm">
        <Flex gap="md" align="center" wrap="wrap">
          <Box style={{ flex: 2.5 }}>
            <Text align="start" className={styles.title}>
              We do what we love, and we love what we do
            </Text>
          </Box>

          <Box
            style={{
              flex: 6.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text size="sm">
              Copyright ©2025 All rights reserved | This site was created for
              educational purposes
            </Text>
          </Box>

          <Box
            style={{
              flex: 3,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Group gap="md" wrap="nowrap">
              <ActionIcon size="lg" variant="subtle" color="--color-white">
                <IconBrandTwitter size={48} stroke={1.5} />
              </ActionIcon>
              <ActionIcon size="lg" variant="subtle" color="--color-white">
                <IconBrandYoutube size={48} stroke={1.5} />
              </ActionIcon>
              <ActionIcon size="lg" variant="subtle" color="--color-white">
                <IconBrandInstagram size={48} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Box>
        </Flex>{" "}
      </Container>
    </div>
  );
}
