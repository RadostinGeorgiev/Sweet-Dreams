import { Container } from "@mantine/core";
import "@mantine/carousel/styles.css";

import { useGetItems } from "../../../hooks/useItems";
import { endpoints } from "../../../../config";

import ItemsMasonry from "../containers/ItemsMasonry/ItemsMasonry";
import ItemsCarousel from "../elements/ItemsCarousel/ItemsCarousel";
import GalleryCarousel from "../elements/GalleryCarousel/GalleryCarousel";
import Loading from "../elements/Loading";

export default function HomePage() {
  const pageSize = 20;

  const {
    data: topRatedBlogs,
    loading: topRatedBlogLoading,
    error: topRatedBlogError,
    page,
    setPage,
    total,
  } = useGetItems(
    endpoints.blog,
    "_id,title,category,content,readingTimeMinutes,images,reviewCount,_ownerId,_createdOn",
    null,
    "author=_ownerId:authors",
    "rating",
    1,
    pageSize
  );

  const {
    data: recipes,
    loading: recipesLoading,
    error: recipesError,
  } = useGetItems(
    endpoints.blog,
    null,
    null,
    "author=_ownerId:authors",
    "_createdOn",
    1,
    6,
    null
  );

  const {
    data: images,
    loading: imagesLoading,
    error: imagesError,
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

  if (topRatedBlogLoading || recipesLoading || imagesLoading)
    return <Loading />;
  if (topRatedBlogError || recipesError || imagesError)
    return <div>Error: {topRatedBlogError || recipesError || imagesError}</div>;

  return (
    <>
      <ItemsCarousel
        subject={topRatedBlogs}
        endpoint={"/blog"}
        currentPage={page}
        totalPages={Math.ceil(total / pageSize)}
        onPageChange={setPage}
      />

      <Container size="xl" mt="5em">
        <ItemsMasonry subject={recipes} />
      </Container>
      <GalleryCarousel images={images} />
    </>
  );
}
