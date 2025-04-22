import { useEffect } from "react";

import { Container, Title } from "@mantine/core";
import "@mantine/carousel/styles.css";

import { useItemsCRUD } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import ItemsCarousel from "../../containers/ItemsCarousel/ItemsCarousel";
import ResponsiveGrid from "../../containers/ResponsiveGrid";
import RecipeCard from "../../elements/RecipeCard/RecipeCard";
import ItemsMasonry from "../../containers/ItemsMasonry/ItemsMasonry";
import GalleryCarousel from "../../elements/GalleryCarousel/GalleryCarousel";
import Loading from "../../elements/Loading";

import styles from "./HomePage.module.scss";
import PostCard from "../../elements/PostCard/PostCard";

export default function HomePage() {
  const pageSize = 20;

  const {
    items: topRatedBlogs,
    itemsLoading: topRatedBlogLoading,
    itemsError: topRatedBlogError,
    getItems: getTopRatedBlogs,
  } = useItemsCRUD(endpoints.blog, {
    select: "_id,title,category,readingTimeMinutes,images,rating,_ownerId,_createdOn",
    relations: "author=_ownerId:authors@_ownerId",
    sort: "rating desc",
    pageSize: pageSize,
  });

  const {
    items: recipes,
    itemsLoading: recipesLoading,
    itemsError: recipesError,
    getItems: getRecipes,
  } = useItemsCRUD(endpoints.recipes, {
    relations: "author=_ownerId:authors@_ownerId",
    sort: "_createdOn desc",
    pageSize: 6,
  });

  const {
    items: latestBlogs,
    itemsLoading: latestBlogLoading,
    itemsError: latestBlogError,
    getItems: getLatestBlogs,
  } = useItemsCRUD(endpoints.blog, {
    relations: "author=_ownerId:authors@_ownerId",
    sort: "_createdOn desc",
    pageSize: 3,
  });

  const {
    items: images,
    itemsLoading: imagesLoading,
    itemsError: imagesError,
    getItems: getImages,
  } = useItemsCRUD(endpoints.recipes, {
    select: "_id,images",
    relations: "author=_ownerId:authors@_ownerId",
    sort: "reviewCount",
    pageSize: 20,
  });

  useEffect(() => {
    getTopRatedBlogs();
    getRecipes();
    getLatestBlogs();
    getImages();
  }, []);

  if (topRatedBlogLoading || recipesLoading || latestBlogLoading || imagesLoading) return <Loading />;
  if (topRatedBlogError || recipesError || latestBlogError || imagesError)
    return (
      <div>
        Error:
        {topRatedBlogError || recipesError || latestBlogError || imagesError}
      </div>
    );

  return (
    <>
      <ItemsCarousel items={topRatedBlogs} endpoint={"/blog"} maxColumns={3} />

      <Container size="xl" className={styles.container}>
        <Title order={4} fw={400} tt="uppercase" align="start" c="dimmed" className={styles.title}>
          Latest Recipes
        </Title>
        <ResponsiveGrid items={recipes} maxColumns={3} CardComponent={RecipeCard} />

        <Title order={4} fw={400} tt="uppercase" align="start" c="dimmed" className={styles.title}>
          Latest Posts
        </Title>
        <ItemsMasonry items={latestBlogs} maxColumns={3} CardComponent={PostCard} />
      </Container>

      <GalleryCarousel images={images} />
    </>
  );
}
