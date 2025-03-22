import { Container } from "@mantine/core";
import RecipeList from "../containers/RecipeList/RecipeList";

export default function Recipes({ recipes }) {
  return (
    <Container size="xl" mt="md">
      <h1>Recipes List</h1>
      <RecipeList recipes={recipes} />
    </Container>
  );
}
