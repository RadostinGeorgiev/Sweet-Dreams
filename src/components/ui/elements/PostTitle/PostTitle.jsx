import { Box, Title, Text, Divider, List } from "@mantine/core";

import { IconUserEdit, IconClock, IconMessage } from "@tabler/icons-react";
import styles from "./PostTitle.module.scss";

export default function PostTitle({ item, variant, size }) {
  return (
    <Box className={`${styles.text} ${styles[variant]} ${styles[size]}`}>
      <Text span size={"sm"} fw={700} tt={"uppercase"} className={styles.label}>
        {item?.category[0]}
      </Text>
      <Title order={4} fw={400} className={`${styles.title}`}>
        {item?.title}
      </Title>

      <List className={styles.widget}>
        <List.Item icon={<IconUserEdit size={16} />}>
          <Text>{`${item?.author?.firstName} ${item?.author?.lastName}`}</Text>
        </List.Item>
        <Divider orientation="vertical" />
        <List.Item icon={<IconClock size={16} />}>
          <Text>{item?.prepTimeMinutes} min prep</Text>
        </List.Item>
        <Divider orientation="vertical" />
        <List.Item icon={<IconClock size={16} />}>
          <Text>{item?.cookTimeMinutes} min cook</Text>
        </List.Item>
        <Divider orientation="vertical" />
        <List.Item icon={<IconMessage size={16} />}>
          <Text>{item?.reviewCount} Comments</Text>
        </List.Item>
      </List>
    </Box>
  );
}
