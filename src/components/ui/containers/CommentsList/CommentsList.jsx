import React, { useState } from "react";
import { Stack, List, ListItem, Text } from "@mantine/core";

import { CommentCard } from "../../elements/CommentCard/CommentCard";
import CreateCommentForm from "../../elements/CreateComment/CreateComment";
import styles from "./CommentsList.module.scss";

export default function CommentsList({
  comments,
  onReply,
  onCancelReply,
  onAddComment,
  isLogged,
}) {
  const [replyId, setReplyId] = useState(null);

  const handleLocalReply = (comment) => {
    setReplyId(comment);
    onReply(comment);
  };

  const handleSubmitReply = (comment) => {
    onAddComment(comment);
    setReplyId(null);
  };

  const handleLocalCancel = () => {
    setReplyId(null);
    onCancelReply?.();
  };

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
              <CommentCard
                comment={comment}
                isReplying={replyId === comment._id}
                onReply={handleLocalReply}
                onCancelReply={handleLocalCancel}
                isLogged={isLogged}
              />

              {replyId === comment._id && (
                <div className={styles.replyFormContainer}>
                  <CreateCommentForm
                    onAddComment={handleSubmitReply}
                    parent={comment}
                    onCancel={handleLocalCancel}
                  />
                </div>
              )}
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
