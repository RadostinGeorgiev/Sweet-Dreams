import { useState } from "react";
import { Link } from "react-router";

import { Grid, Group, Select, Pagination } from "@mantine/core";

import BlogCard from "../../elements/BlogCard/BlogCard";

import { useGetItems } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import styles from "./BlogList.module.scss";

export default function BlogList() {
  const [sortValue, setSortValue] = useState("createdAt desc");
  const pageSize = 6;

  const {
    data: articles,
    loading: articlesLoading,
    error: articlesError,
    page,
    setPage,
    total,
  } = useGetItems(
    endpoints.blog,
    sortValue,
    1,
    pageSize,
    "author=_authorId:authors"
  );

  if (articlesLoading) return <div>Loading...</div>;
  if (articlesError) return <div>Error: {articlesError}</div>;

  return (
    <>
      <Group justify="end" mt="lg">
        <Select
          size="md"
          label="SortBy"
          data={[
            { value: "createdAt desc", label: "Newest" },
            { value: "createdAt", label: "Oldest" },
            { value: "title", label: "Title (A-Z)" },
            { value: "title desc", label: "Title (Z-A)" },
            { value: "rating desc", label: "Highest rated" },
            { value: "rating", label: "Lowest rated" },
            { value: "views desc", label: "Popularity" },
          ]}
          value={sortValue}
          onChange={setSortValue}
        />
      </Group>
      <Grid gutter="md">
        {articles?.map((article) => {
          return (
            <Grid.Col key={article._id} span={6}>
              <Link to={`/blog/${article._id}`} className={styles.link}>
                <BlogCard article={article} />
              </Link>
            </Grid.Col>
          );
        })}
      </Grid>
      <Group justify="center" mt="lg">
        <Pagination total={total} value={page} onChange={setPage} />
      </Group>
    </>
  );
}
