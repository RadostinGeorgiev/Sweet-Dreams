import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import { Flex, Grid, Group, Text, Select, Pagination, Button } from "@mantine/core";
import { IconWriting } from "@tabler/icons-react";

import PostCard from "../../elements/PostCard/PostCard";
import Loading from "../../elements/Loading";

import { useAuth } from "../../../../context/AuthContext";
import { useItemsCRUD } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import styles from "./BlogList.module.scss";

export default function BlogList() {
  const { isLogged } = useAuth();
  const loggedIn = isLogged();
  const [page, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("_createdOn desc");
  const [filterQuery, setFilterQuery] = useState("");
  const location = useLocation();

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
  }, [sortValue, page, filterQuery]);

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
      <Grid gutter="md">
        {articles?.map((article) => {
          return (
            <Grid.Col key={article._id} span={6}>
              <PostCard article={article} />
            </Grid.Col>
          );
        })}
      </Grid>
      <Group justify="center" mt="lg">
        <Pagination radius="0" total={totalPages} value={page} onChange={setPage} />
      </Group>
    </>
  );
}
