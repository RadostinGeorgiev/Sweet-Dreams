import { useEffect, useState } from "react";

import { Container } from "@mantine/core";

import BlogMasonry from "./BlogMasonry/BlogMasonry";
import BlogList from "./BlogList/BlogList";

export default function Main() {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/c/f4c3-1f33-4174-878d")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.posts);
      });

    fetch("https://dummyjson.com/users?limit=200")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  return (
    <>
      <h2>Main</h2>
      <Container size="lg" mt="md">
        <h1>Sweet Dreams</h1>
        <BlogMasonry articles={articles} users={users} />
        <BlogList articles={articles} users={users} />
      </Container>
    </>
  );
}
