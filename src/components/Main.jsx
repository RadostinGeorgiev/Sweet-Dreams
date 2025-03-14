import { useEffect, useState } from "react";

import { Container } from "@mantine/core";

import BlogList from "./BlogList/BlogList";

export default function Main() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/c/f4c3-1f33-4174-878d")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.posts);
      });
  }, []);

  return (
    <>
      <h2>Main</h2>
      <Container size="lg" mt="md">
        <h1>Sweet Dreams</h1>
        <BlogList articles={articles} />
      </Container>
    </>
  );
}
