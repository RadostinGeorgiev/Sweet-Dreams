import { Container } from "@mantine/core";
import "@mantine/carousel/styles.css";

import { useGetItems } from "../../../hooks/useItems";
import { endpoints } from "../../../../config";

import BlogMasonry from "../containers/BlogMasonry/BlogMasonry";
import GalleryCarousel from "../elements/GalleryCarousel";

export default function HomePage() {
  const {
    data: articles,
    loading: articlesLoading,
    error: articlesError,
  } = useGetItems(
    endpoints.blog,
    null,
    null,
    "author=_ownerId:authors",
    "createdAt",
    1,
    6,
    null
  );

  const {
    data: images,
    loading: recipesLoading,
    error: recipesError,
  } = useGetItems(
    endpoints.recipes,
    "_id,images",
    null,
    "author=_ownerId:authors",
    "reviewCount",
    1,
    10,
    null
  );

  if (articlesLoading || recipesLoading) return <div>Loading...</div>;
  if (articlesError || recipesError)
    return <div>Error: {articlesError || recipesError}</div>;

  return (
    <Container size="xl" mt="md">
      <h1>Sweet Dreams</h1>
      <BlogMasonry articles={articles} />

      <GalleryCarousel images={images} />
    </Container>
  );
}
