import { useEffect, useState } from "react";

import { Container, Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

import BlogMasonry from "./BlogMasonry/BlogMasonry";
import BlogList from "./BlogList/BlogList";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);

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

    fetch("https://dummyjson.com/recipes?limit=20&select=image")
      .then((response) => response.json())
      .then((data) => {
        setImages(data.recipes);
      });
  }, []);

  return (
    <>
      <h2>Main</h2>
      <Container size="lg" mt="md">
        <h1>Sweet Dreams</h1>
        <BlogMasonry articles={articles} users={users} />
        <BlogList articles={articles} users={users} />
        <Carousel height={300} slideSize="md" slideGap="xs" loop dragFree>
          {images.map((src) => {
            return (
              <Carousel.Slide key={src.id}>
                <Image
                  h="auto"
                  w={200}
                  src={src.image}
                  alt={`Image ${src.id}`}
                  radius="0"
                />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </Container>
    </>
  );
}
