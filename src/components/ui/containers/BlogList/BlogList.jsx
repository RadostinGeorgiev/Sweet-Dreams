import { Link } from "react-router";

import { Grid } from "@mantine/core";

import BlogCard from "../../elements/BlogCard/BlogCard";

import styles from "./BlogList.module.scss";

export default function BlogList({ articles, users }) {
  return (
    <Grid gutter="md">
      {articles.map((article) => {
        const author = users?.find((user) => user.id === article.userId);
        return (
          <Grid.Col key={article.id} span={6}>
            <Link
              to={`/blog/${article.id}`}
              key={article.id}
              className={styles.link}
            >
              <BlogCard article={article} author={author} />
            </Link>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
