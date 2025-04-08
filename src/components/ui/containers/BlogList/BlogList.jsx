import { Grid } from "@mantine/core";

import PostCard from "../../elements/PostCard/PostCard";

// import styles from "./BlogList.module.scss";

export default function BlogList({ articles }) {
  return (
    <Grid gutter="md">
      {articles?.map((article) => {
        return (
          <Grid.Col key={article._id} span={6}>
            <PostCard article={article} />
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
