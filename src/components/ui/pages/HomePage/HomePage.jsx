import { useEffect, useState } from "react";

import { Container, Title } from "@mantine/core";
import "@mantine/carousel/styles.css";

import { useItemsCRUD } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import ItemsMasonry from "../../containers/ItemsMasonry/ItemsMasonry";
import ItemsCarousel from "../../containers/ItemsCarousel/ItemsCarousel";
import GalleryCarousel from "../../elements/GalleryCarousel/GalleryCarousel";
import Loading from "../../elements/Loading";

import styles from "./HomePage.module.scss";
import RecipeList from "../../containers/RecipeList/RecipeList";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const {
    items: topRatedBlogs,
    itemsLoading: topRatedBlogLoading,
    itemsError: topRatedBlogError,
    items: topRatedBlogsTotalPages,
    getItems: getTopRatedBlogs,
  } = useItemsCRUD(endpoints.blog, {
    select: "_id,title,category,content,readingTimeMinutes,images,reviewCount,_ownerId,_createdOn",
    relations: "author=_ownerId:authors@_ownerId",
    sort: "rating",
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
      <ItemsCarousel
        subject={topRatedBlogs}
        endpoint={"/blog"}
        currentPage={page}
        totalPages={topRatedBlogsTotalPages}
        onPageChange={setPage}
      />

      <Container size="xl" className={styles.container}>
        <Title order={4} fw={400} tt="uppercase" align="start" c="dimmed" className={styles.title}>
          Latest Recipes
        </Title>
        <RecipeList recipes={recipes} columns={3} />

        <Title order={4} fw={400} tt="uppercase" align="start" c="dimmed" className={styles.title}>
          Latest Posts
        </Title>
        <ItemsMasonry subject={latestBlogs} />
      </Container>
      <GalleryCarousel images={images} />
    </>
  );
}
