import { Container, Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

import BlogMasonry from "../containers/BlogMasonry/BlogMasonry";

// import UsersList from "./UsersList/UsersList";

export default function HomePage({ articles, users, images }) {
  return (
    <Container size="xl" mt="md">
      <h1>Sweet Dreams</h1>
      {/* <UsersList users={users} /> */}
      <BlogMasonry articles={articles} users={users} />

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
  );
}
