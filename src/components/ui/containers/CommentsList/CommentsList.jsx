import { Stack, List, ListItem, Text } from "@mantine/core";

import { CommentCard } from "../../elements/CommentCard/CommentCard";
import styles from "./CommentsList.module.scss";

export default function CommentsList({ comments }) {
  return (
    <Stack justify="flex-start" mt="lg" className={styles.list}>
      <Text span size="md" tt="uppercase" c="dimmed">
        {comments.length} comments
      </Text>

      <List>
        {comments.map((comment) => (
          <ListItem key={comment._id} className={styles.item}>
            <CommentCard comment={comment} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
