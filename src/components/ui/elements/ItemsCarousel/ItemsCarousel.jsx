import { Link } from "react-router";

import { BackgroundImage, Card, Flex, Grid, Overlay } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

import MetaDate from "../MetaDate/MetaDate";
import PostTitle from "../PostTitle/PostTitle";

import styles from "./ItemsCarousel.module.scss";

export default function ItemsCarousel({ subject, endpoint }) {
  if (!subject) return;

  const sortedPosts = subject
    .slice()
    .sort((a, b) => b.reviewCount - a.reviewCount);

  function division(data, size) {
    const chunks = [];

    for (let i = 0; i < data.length; i += size) {
      chunks.push(data.slice(i, i + size));
    }
    return chunks;
  }

  const listIntoParts = division(sortedPosts, 4);

  return (
    <Carousel
      classNames={styles}
      height="60vh"
      type="slide"
      slideSize={{ base: "100%", "300px": "50%", "500px": "33.333333%" }}
      slideGap={{ base: 0, "300px": "xs", "500px": "md" }}
      align="start"
      loop
      controlsOffset="md"
      withIndicators
    >
      {listIntoParts.map((chunk, index) => (
        <Carousel.Slide key={index} style={{ height: "100%" }}>
          <Grid gutter="md" style={{ height: "100%" }}>
            <Grid.Col span={6} style={{ height: "100%" }}>
              <Link to={`${endpoint}/${chunk[0]._id}`}>
                <CarouselItem item={chunk[0]} size="large" />
              </Link>
            </Grid.Col>

            <Grid.Col span={3} style={{ height: "100%" }}>
              <Grid style={{ height: "100%" }}>
                <Grid.Col span={12} style={{ height: "50%" }}>
                  {chunk[1] && (
                    <Link to={`${endpoint}/${chunk[1]._id}`}>
                      <CarouselItem item={chunk[1] || null} size="small" />
                    </Link>
                  )}
                </Grid.Col>
                <Grid.Col span={12} style={{ height: "50%" }}>
                  {chunk[2] && (
                    <Link to={`${endpoint}/${chunk[2]._id}`}>
                      <CarouselItem item={chunk[2] || null} size="small" />
                    </Link>
                  )}
                </Grid.Col>
              </Grid>
            </Grid.Col>

            <Grid.Col span={3} style={{ height: "100%" }}>
              {chunk[3] && (
                <Link to={`${endpoint}/${chunk[3]._id}`}>
                  <CarouselItem item={chunk[3] || null} size="medium" />
                </Link>
              )}
            </Grid.Col>
          </Grid>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

function CarouselItem({ item, size }) {
  const isoDate = new Date("2024-11-24T10:30:00.000Z");
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short" });

  const date = {
    day: isoDate.getDate(),
    month: formatter.format(isoDate),
  };

  return (
    <Card shadow="sm" padding="sm" radius="0">
      <Card.Section className={`${styles.item}`}>
        <BackgroundImage
          src={item.images[0]}
          className={`${styles[size]} ${styles.item}`}
        >
          <Overlay
            gradient="linear-gradient(transparent, rgba(0, 0, 0, 0.8))"
            opacity={0.5}
          />

          <Flex
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
            className={styles["item-text"]}
          >
            <MetaDate
              date={date}
              size={size}
              color="--color-white"
              background="--background-color-hero"
            />
            <PostTitle item={item} size={size} variant="carousel" />
          </Flex>
        </BackgroundImage>
      </Card.Section>
    </Card>
  );
}
