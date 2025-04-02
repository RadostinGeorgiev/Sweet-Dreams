import { useState } from "react";
import { Link } from "react-router";

import {
  Grid,
  Group,
  Flex,
  Text,
  Select,
  Pagination,
  Button,
} from "@mantine/core";
import { IconWriting } from "@tabler/icons-react";

import RecipeCard from "../../elements/RecipeCard/RecipeCard";
import Loading from "../../elements/Loading";

import { useAuth } from "../../../../context/AuthContext";
import { useGetItems } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

import styles from "./RecipeList.module.scss";

export default function RecipeList() {
  const { isLogged } = useAuth();
  const loggedIn = isLogged();
  const [sortValue, setSortValue] = useState("_createdOn desc");
  const pageSize = 10;

  const {
    data: recipes,
    loading: recipesLoading,
    error: recipesError,
    page,
    setPage,
    total,
  } = useGetItems(
    endpoints.recipes,
    null,
    null,
    "author=_ownerId:authors",
    sortValue,
    1,
    pageSize
  );

  if (recipesLoading) return <Loading />;
  if (recipesError) return <div>Error: {recipesError}</div>;

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
              { value: "name", label: "Title (A-Z)" },
              { value: "name desc", label: "Title (Z-A)" },
              { value: "difficulty desc", label: "Мost difficult" },
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
      <Grid gutter="xs">
        {recipes?.map((recipe) => (
          <Grid.Col key={recipe._id} span={6}>
            <RecipeCard recipe={recipe} />
          </Grid.Col>
        ))}
      </Grid>
      <Group justify="center" mt="lg">
        <Pagination radius="0" total={total} value={page} onChange={setPage} />
      </Group>
    </>
  );
}
