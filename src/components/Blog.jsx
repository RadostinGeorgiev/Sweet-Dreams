import { Container } from "@mantine/core";

import BlogList from "./BlogList/BlogList";

export default function Blog({ articles, users }) {
  return (
    <Container size="lg" mt="md">
      <h1>Blog List</h1>
      <BlogList articles={articles} users={users} />;
    </Container>
  );
}
