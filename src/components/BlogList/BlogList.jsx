import BlogCard from "../BlogCard/BlogCard";

import styles from "./BlogList.module.scss";

export default function BlogList({ articles, users }) {
  return (
    <div className={styles.masonry}>
      {articles.map((article) => {
        const author = users?.find((user) => user.id === article.userId);

        return (
          <BlogCard
            key={article.id}
            article={article}
            className={styles["masonry-item"]}
            author={author}
          />
        );
      })}
    </div>
  );
}
