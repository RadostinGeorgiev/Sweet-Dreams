import { useEffect, useState } from "react";

import { Container } from "@mantine/core";

import BlogCard from "./BlogCard/BlogCard";

import styles from "./Main.module.scss";

export default function Main() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/c/f4c3-1f33-4174-878d")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
      });
  }, []);

  const getChild = (height) => (
    <Skeleton height={height} radius="md" animate={false} />
  );
  const BASE_HEIGHT = 360;
  const getSubHeight = (children, spacing) =>
    BASE_HEIGHT / children - spacing * ((children - 1) / children);

  return (
    <Container size="lg" mt="md">
      <h1>Sweet Dreams</h1>

      <div className={styles.masonry}>
        {posts.map((post) => (
          <BlogCard className={styles["masonry-item"]} post={post} />
        ))}
      </div>
    </Container>
  );
}
