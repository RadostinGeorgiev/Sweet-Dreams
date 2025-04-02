import { Container } from "@mantine/core";
import RecipeList from "../containers/RecipeList/RecipeList";

export default function Recipes({ recipes }) {
  return (
    <Container size="xl" mt="md">
      <RecipeList recipes={recipes} />
    </Container>
  );
}
