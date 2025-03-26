import {
  Container,
  Grid,
  Group,
  NativeSelect,
  Pagination,
} from "@mantine/core";

import RecipeCard from "../../elements/RecipeCard/RecipeCard";

import { useGetItems } from "../../../../hooks/useItems";
import { endpoints } from "../../../../../config";

export default function RecipeList() {
  const pageSize = 10;

  const {
    data: recipes,
    loading: recipesLoading,
    error: recipesError,
    page,
    setPage,
    total,
  } = useGetItems(endpoints.recipes, 1, pageSize);

  if (recipesLoading) return <div>Loading...</div>;
  if (recipesError) return <div>Error: {recipesError}</div>;

  return (
    <Container size="lg" mt="md">
      <Group justify="end" mt="lg">
        <NativeSelect
          size="md"
          label="SortBy"
          data={[
            "Popularity",
            "Newest",
            "Oldest",
            "Title (A-Z)",
            "Title (Z-A)",
          ]}
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
        <Pagination total={total} value={page} onChange={setPage} />
      </Group>
    </Container>
  );
}
