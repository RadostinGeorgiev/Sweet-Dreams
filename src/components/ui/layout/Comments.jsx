import { useEffect, useState } from "react";

import { useAuth } from "../../../context/AuthContext";
import { useItemsCRUD } from "../../../hooks/useItems";
import { endpoints } from "../../../../config";

import CommentsList from "../containers/CommentsList/CommentsList";
import CreateCommentForm from "../elements/CreateComment/CreateComment";
import Loading from "../elements/Loading";

export default function Comments({ subject }) {
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
    if (subject?._id) {
      getComments({
        filter: `_postId="${subject._id}"`,
        page: 1,
      });
    }
  }, [subject?._id]);

  if (commentsLoading) return <Loading />;
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
