import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import { Button, Container, Flex, Group, Pagination, Select, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconWriting } from "@tabler/icons-react";

import { useAuth } from "../../../../context/AuthContext";
import { useItemsCRUD } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import Loading from "../../elements/Loading";
import ResponsiveGrid from "../../containers/ResponsiveGrid";
import RecipeCard from "../../elements/RecipeCard/RecipeCard";

import styles from "./Recipes.module.scss";

export default function Recipes() {
  const { isLogged } = useAuth();
  const loggedIn = isLogged();
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [filterQuery, setFilterQuery] = useState("");
  const [sortValue, setSortValue] = useState("_createdOn desc");

  const maxColumns = 3;
  const isMd = useMediaQuery("(min-width: 768px)");
  const isLg = useMediaQuery("(min-width: 992px)");

  let columns = 1;
  if (isMd && !isLg) columns = 2;
  else if (isLg) columns = Math.min(maxColumns, 4);

  const pageSize = columns * 4;

  const {
    items: recipes,
    itemsLoading: recipesLoading,
    itemsError: recipesError,
    totalPages,
    getItems: getRecipes,
  } = useItemsCRUD(endpoints.recipes, {
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
    getRecipes({
      page,
      sort: sortValue,
      filter: filterQuery,
    });
  }, [page, pageSize, sortValue, filterQuery]);

  if (recipesLoading) return <Loading />;
  if (recipesError) return <div>Error: {recipesError}</div>;

  return (
    <Container size="xl" mt="md">
      <Flex justify="space-between" align="center" mt="lg" p="md">
        <Flex justify="start" align="center" gap="xs">
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
              { value: "difficulty desc", label: "Most difficult" },
              { value: "difficulty", label: "Easiest" },
              { value: "cookTimeMinutes", label: "Cooking time" },
              { value: "rating desc", label: "Highest rated" },
              { value: "rating", label: "Lowest rated" },
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
            to="/recipes/create"
          >
            Create Recipe
          </Button>
        )}
      </Flex>

      <ResponsiveGrid items={recipes} maxColumns={maxColumns} CardComponent={RecipeCard} />

      <Group justify="center" m="lg">
        <Pagination radius="0" total={totalPages} value={page} onChange={setPage} />
      </Group>
    </Container>
  );
}
