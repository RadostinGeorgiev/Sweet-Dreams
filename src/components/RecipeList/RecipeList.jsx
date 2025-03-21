import { Container, Grid } from "@mantine/core";

import BlogCard from "../BlogCard/BlogCard";

export default function RecipeList({ recipes }) {
  return (
    <Container size="lg" mt="md">
      <Grid gutter="lg">
        {recipes.map((recipe) => (
          <Grid.Col
            key={recipe.id}
            span={recipe.featured ? 12 : 6} // Голямата статия заема 2 колони (span 12)
          >
            <BlogCard key={recipe.id} post={recipe} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
