import { Container, Grid, Pagination } from "@mantine/core";

import RecipeCard from "../../elements/RecipeCard/RecipeCard";

export default function RecipeList({ recipes }) {
  return (
    <Container size="lg" mt="md">
      <Grid gutter="xs">
        {recipes.map((recipe) => (
          <Grid.Col key={recipe.id} span={6}>
            <RecipeCard key={recipe.id} recipe={recipe} />
          </Grid.Col>
        ))}
      </Grid>
      <Pagination />
    </Container>
  );
}
