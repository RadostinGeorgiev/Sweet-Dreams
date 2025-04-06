import { Grid } from "@mantine/core";

import RecipeCard from "../../elements/RecipeCard/RecipeCard";

// import styles from "./RecipeList.module.scss";

export default function RecipeList({ recipes, columns }) {
  let size = "large";
  if (!recipes) return null;
  if (columns == 3) {
    size = "medium";
  } else if (columns > 3) {
    size = "small";
  }

  return (
    <>
      <Grid gutter="xs">
        {recipes?.map((recipe) => (
          <Grid.Col key={recipe._id} span={Math.ceil(12 / columns)}>
            <RecipeCard recipe={recipe} size={size} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
