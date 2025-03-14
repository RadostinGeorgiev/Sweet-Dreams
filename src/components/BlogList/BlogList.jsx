import { Grid } from "@mantine/core";

import BlogCard from "../BlogCard/BlogCard";

// import styles from "./BlogList.module.scss";

export default function BlogList({ articles, users }) {
  return (
    <>
      {articles.map((article) => {
        const author = users?.find((user) => user.id === article.userId);

        return (
          <BlogCard article={article} author={author} layout="horizontal" />
        );
      })}
    </>
  );
}
