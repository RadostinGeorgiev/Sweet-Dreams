import { Link } from "react-router";

import { BackgroundImage, Card, Flex, Grid, Overlay } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

import MetaDate from "../../elements/MetaDate/MetaDate";
import PostTitle from "../../elements/PostTitle/PostTitle";

import styles from "./ItemsCarousel.module.scss";
import { useColumns } from "../../../../hooks/useColumns";

export default function ItemsCarousel({ items, endpoint, maxColumns }) {
  const columns = useColumns(maxColumns);

  if (!items) return;

  function division(data, size) {
    if (size === 1) return data.map((item) => [item]);

    size = size + 1;
    const chunks = [];

    for (let i = 0; i < data.length; i += size) {
      chunks.push(data.slice(i, i + size));
    }
    return chunks;
  }

  const listIntoParts = division(items, columns);
  console.log("columns", columns);
  console.log("listIntoParts", listIntoParts);

  const getColumnSpans = (columns) => {
    switch (columns) {
      case 1:
        return [12];
      case 2:
        return [8, 4];
      case 3:
        return [6, 3, 3];
      case 4:
        return [5, 3, 2, 2];
      default:
        return [12];
    }
  };

  const spans = getColumnSpans(columns);

  return (
    <Carousel
      className={styles.root}
      classNames={{
        controls: styles.controls,
        control: styles.control,
      }}
      height="60vh"
      type="slide"
      slideSize={{ base: "100%", "300px": "50%", "500px": "33.333333%" }}
      slideGap={"xs"}
      align="start"
      loop
      controlsOffset="md"
      withIndicators
    >
      {listIntoParts.map((chunk, index) => (
        <Carousel.Slide key={index} style={{ height: "100%" }}>
          <Grid style={{ height: "100%" }}>
            <Grid.Col span={spans[0]} pl="sm" style={{ height: "100%" }}>
              <Link to={`${endpoint}/${chunk[0]._id}`}>
                <CarouselItem item={chunk[0]} size="large" />
              </Link>
            </Grid.Col>

            {columns > 1 && (
              <Grid.Col span={spans[1]} style={{ height: "100%" }}>
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
            )}

            {columns > 2 && (
              <Grid.Col span={spans[2]} pr="sm" style={{ height: "100%" }}>
                {chunk[3] && (
                  <Link to={`${endpoint}/${chunk[3]._id}`}>
                    <CarouselItem item={chunk[3] || null} size="medium" />
                  </Link>
                )}
              </Grid.Col>
            )}

            {columns > 3 && (
              <Grid.Col span={spans[3]} style={{ height: "100%" }}>
                {chunk[4] && (
                  <Link to={`${endpoint}/${chunk[4]._id}`}>
                    <CarouselItem item={chunk[4] || null} size="medium" />
                  </Link>
                )}
              </Grid.Col>
            )}
          </Grid>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

function CarouselItem({ item, size }) {
  if (!item?._createdOn) return;

  const isoDate = new Date(item._createdOn);
  if (isNaN(isoDate.getTime())) {
    console.warn("Invalid date:", item._createdOn);
    return;
  }

  const date = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(isoDate);

  return (
    <Card shadow="sm" padding="sm" radius="0">
      <Card.Section className={styles.item}>
        <BackgroundImage src={item.images[0]} className={`${styles[size]} ${styles.item}`}>
          <Overlay gradient="linear-gradient(transparent, rgba(0, 0, 0, 0.8))" opacity={0.5} />

          <Flex
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
            className={styles["item-text"]}
          >
            <MetaDate date={date} size={size} color="--color-white" background="--background-color-hero" />
            <PostTitle item={item} size={size} variant="carousel" />
          </Flex>
        </BackgroundImage>
      </Card.Section>
    </Card>
  );
}
