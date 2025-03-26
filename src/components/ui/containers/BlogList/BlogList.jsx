import { Link } from "react-router";

import { Grid } from "@mantine/core";

import BlogCard from "../../elements/BlogCard/BlogCard";

import styles from "./BlogList.module.scss";

export default function BlogList({ articles }) {
  return (
    <Grid gutter="md">
      {articles?.map((article) => {
        return (
          <Grid.Col key={article._id} span={6}>
            <Link to={`/blog/${article._id}`} className={styles.link}>
              <BlogCard article={article} />
            </Link>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
