import BlogList from "./BlogList/BlogList";

export default function Blog({ articles, users }) {
  return (
    <>
      <h1>Blog List</h1>
      <BlogList articles={articles} users={users} />;
    </>
  );
}
