import { Stack, List, ListItem, Text } from "@mantine/core";

import { CommentCard } from "../../elements/CommentCard/CommentCard";
import styles from "./CommentsList.module.scss";
import React from "react";

export default function CommentsList({ comments, onReply }) {
  const commentGroups = comments.reduce((acc, comment) => {
    const parentId = comment._parentId || null;
    if (!acc[parentId]) acc[parentId] = [];
    acc[parentId].push(comment);
    return acc;
  }, {});

  const renderComments = (parentId = null, depth = 0) => {
    const group = commentGroups[parentId] || [];

    return (
      <List className={styles.list}>
        {group.map((comment) => (
          <React.Fragment key={comment._id}>
            <ListItem
              className={styles.item}
              style={{
                marginLeft: `${depth * 80}px`,
              }}
            >
              <CommentCard comment={comment} onReply={onReply} />
            </ListItem>

            {renderComments(comment._id, depth + 1)}
          </React.Fragment>
        ))}
      </List>
    );
  };

  return (
    <Stack justify="flex-start" mt="lg" className={styles.list}>
      <Text span size="md" tt="uppercase" c="dimmed">
        {comments.length} comments
      </Text>

      {renderComments()}
    </Stack>
  );
}
