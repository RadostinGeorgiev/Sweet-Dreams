import { useEffect, useState } from "react";

import { useAuth } from "../../../context/AuthContext";
import { useGetItems } from "../../../hooks/useItems";
import { endpoints } from "../../../../config";

import CommentsList from "../containers/CommentsList/CommentsList";
import CreateCommentForm from "../elements/CreateComment/CreateComment";

export default function Comments({ subject }) {
  const [filter, setFilter] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(true);
  const [replyTo, setReplyTo] = useState(null);

  const { isLogged } = useAuth();
  const loggedIn = isLogged();

  const {
    data: comments,
    setData: setComments,
    loading: commentsLoading,
    error: commentsError,
  } = useGetItems(
    endpoints.comments,
    filter,
    "author=_ownerId:users",
    null,
    1,
    100
  );

  useEffect(() => {
    if (subject?._id) {
      setFilter(`_postId=${subject?._id}`);
    }
  }, [subject?._id]);

  if (commentsLoading) return <div>Loading...</div>;
  if (commentsError) return <div>Error: {commentsError}</div>;

  const handleReply = (comment) => {
    setReplyTo(comment);
    setShowCommentForm(false);
  };

  const handleCancelReply = () => {
    setReplyTo(null);
    setShowCommentForm(true);
  };

  const handleAddComment = (comment) => {
    setComments((prev) => [...prev, comment]);
  };

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
        <CreateCommentForm
          subject={subject}
          onAddComment={handleAddComment}
          parent={replyTo}
        />
      )}
    </>
  );
}
