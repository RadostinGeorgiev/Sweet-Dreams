import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";

import { Link } from "react-router";
import styles from "./GalleryCarousel.module.scss";

export default function GalleryCarousel({ images }) {
  return (
    <Carousel
      className={styles.root}
      classNames={{
        controls: styles.controls,
        control: styles.control,
      }}
      height={300}
      slideSize="md"
      slideGap="xs"
      loop
      dragFree
    >
      {images?.map((src) => {
        return (
          <Carousel.Slide key={src._id}>
            <Link to={`/recipes/${src._id}`}>
              <Image
                h="100%"
                w={200}
                src={src.images[0]}
                alt={`Image ${src._id}`}
                radius="0"
                fit="cover"
              />
            </Link>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}
