import { useState } from "react";
import { Grid, Group, Select, Pagination } from "@mantine/core";

import RecipeCard from "../../elements/RecipeCard/RecipeCard";
import Loading from "../../elements/Loading";

import { useGetItems } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

export default function RecipeList() {
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
      <Group justify="end" mt="lg">
        <Select
          size="md"
          label="SortBy"
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
      </Group>
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
