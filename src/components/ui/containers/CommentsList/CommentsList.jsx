import { Group, List, ListItem, Text } from "@mantine/core";

import { CommentCard } from "../../elements/CommentCard/CommentCard";
import styles from "./CommentsList.module.scss";

export default function CommentsList({ comments }) {
  return (
    <Group justify="flex-start">
      <Text span size="md" tt="uppercase" c="dimmed">
        {comments.length} comments
      </Text>
      <List className={styles.comments}>
        {comments.map((comment) => (
          <ListItem key={comment._id}>
            <CommentCard comment={comment} />
          </ListItem>
        ))}
      </List>
    </Group>
  );
}
