import { useEffect, useState } from "react";
import { Link } from "react-router";

import { Button, Container, Flex, Group, Pagination, Select, Text } from "@mantine/core";
import { IconWriting } from "@tabler/icons-react";

import { useAuth } from "../../../../context/AuthContext";
import { useItemsCRUD } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import Loading from "../../elements/Loading";
import RecipeList from "../../containers/RecipeList/RecipeList";

import styles from "./Recipes.module.scss";

export default function Recipes() {
  const { isLogged } = useAuth();
  const loggedIn = isLogged();
  const [page, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("_createdOn desc");
  const pageSize = 10;

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
    getRecipes({ page: 1, sort: sortValue });
  }, [sortValue, page]);

  if (recipesLoading) return <Loading />;
  if (recipesError) return <div>Error: {recipesError}</div>;

  return (
    <Container size="xl" mt="md">
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
              { value: "name", label: "Title (A-Z)" },
              { value: "name desc", label: "Title (Z-A)" },
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

      <RecipeList recipes={recipes} columns={2} />

      <Group justify="center" m="lg">
        <Pagination radius="0" total={totalPages} value={page} onChange={setPage} />
      </Group>
    </Container>
  );
}
