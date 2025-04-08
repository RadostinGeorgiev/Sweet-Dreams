import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import { Button, Flex, Group, Select, Text, Pagination } from "@mantine/core";
import { IconWriting } from "@tabler/icons-react";

import { useItemsCRUD } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import Loading from "../../elements/Loading";
import { useAuth } from "../../../../context/AuthContext";
import BlogList from "../../containers/BlogList/BlogList";

import styles from "./Blog.module.scss";

export default function Blog() {
  const { isLogged } = useAuth();
  const loggedIn = isLogged();
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [filterQuery, setFilterQuery] = useState("");
  const [sortValue, setSortValue] = useState("_createdOn desc");

  const pageSize = 6;

  const {
    items: articles,
    itemsLoading: articlesLoading,
    itemsError: articlesError,
    totalPages,
    getItems: getArticles,
  } = useItemsCRUD(endpoints.blog, {
    relations: "author=_ownerId:authors@_ownerId",
    sort: sortValue,
    pageSize: pageSize,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const where = searchParams.get("where") || "";
    setPage(1);
    setFilterQuery(where);
  }, [location.search]);

  useEffect(() => {
    getArticles({
      page,
      sort: sortValue,
      filter: filterQuery,
    });
  }, [page, sortValue, filterQuery]);

  if (articlesLoading) return <Loading />;
  if (articlesError) return <div>Error: {articlesError}</div>;

  return (
    <>
      <Flex justify="space-between" align="center" mt="lg" mb="lg">
        <Flex justify="start" align="center" gap="sm">
          <Text fw={700} ml="xl" ta="right">
            SortBy
          </Text>
          <Select
            size="md"
            data={[
              { value: "_createdOn desc", label: "Newest" },
              { value: "_createdOn", label: "Oldest" },
              { value: "title", label: "Title (A-Z)" },
              { value: "title desc", label: "Title (Z-A)" },
              { value: "rating desc", label: "Highest rated" },
              { value: "rating", label: "Lowest rated" },
              { value: "views desc", label: "Popularity" },
            ]}
            value={sortValue}
            onChange={setSortValue}
          />
        </Flex>

        {loggedIn && (
          <Button
            variant="filled"
            size="compact-md"
            radius="0"
            leftSection={<IconWriting size={16} />}
            className={styles.button}
            component={Link}
            to="/blog/create"
          >
            Create Blog Post
          </Button>
        )}
      </Flex>

      <BlogList articles={articles} />

      <Group justify="center" mt="lg">
        <Pagination radius="0" total={totalPages} value={page} onChange={setPage} />
      </Group>
    </>
  );
}
