import { useEffect, useState, useCallback } from "react";

import { useAuth } from "../../../context/AuthContext";
import { useItemsCRUD } from "../../../hooks/useItems";
import { endpoints } from "../../../../config";

import CommentsList from "../containers/CommentsList/CommentsList";
import CreateCommentForm from "../elements/CreateComment/CreateComment";
import Loading from "../elements/Loading";

export default function Comments({ subject, onCommentAdded }) {
  const [showCommentForm, setShowCommentForm] = useState(true);
  const [replyTo, setReplyTo] = useState(null);

  const { isLogged } = useAuth();
  const loggedIn = isLogged();

  const {
    items: comments,
    setItems: setComments,
    itemsLoading: commentsLoading,
    itemsError: commentsError,
    getItems: getComments,
  } = useItemsCRUD(endpoints.comments, {
    relations: "author=_ownerId:authors@_ownerId",
  });

  useEffect(() => {
    if (!subject?._id) return;

    const loadComments = async () => {
      try {
        await getComments({
          filter: `_postId="${subject._id}"`,
          page: 1,
        });
      } catch (error) {
        console.error("Failed to load comments:", error);
      }
    };

    loadComments();
  }, [subject?._id]);

  const handleReply = useCallback((comment) => {
    setReplyTo(comment);
    setShowCommentForm(false);
  }, []);

  const handleCancelReply = useCallback(() => {
    setReplyTo(null);
    setShowCommentForm(true);
  }, []);

  const handleAddComment = useCallback(
    (comment) => {
      setComments((prev) => [...prev, comment]);

      onCommentAdded?.(subject?._id);
    },
    [subject?._id, onCommentAdded, setComments]
  );

  if (commentsLoading) return <Loading />;
  if (commentsError) return <div>Error: {commentsError}</div>;

  return (
    <>
      <CommentsList
        comments={comments}
        onReply={handleReply}
        onCancelReply={handleCancelReply}
        onAddComment={handleAddComment}
        isLogged={loggedIn}
      />

      {loggedIn && showCommentForm && (
        <CreateCommentForm subject={subject} onAddComment={handleAddComment} parent={replyTo} />
      )}
    </>
  );
}
