import { Link } from "react-router";
import BlogCard from "../../elements/BlogCard/BlogCard";

import styles from "./BlogList.module.scss";

export default function BlogList({ articles, users }) {
  return (
    <>
      {articles.map((article) => {
        const author = users?.find((user) => user.id === article.userId);
        return (
          <Link
            to={`/blog/${article.id}`}
            key={article.id}
            className={styles.link}
          >
            <BlogCard article={article} author={author} layout="horizontal" />
          </Link>
        );
      })}
    </>
  );
}
