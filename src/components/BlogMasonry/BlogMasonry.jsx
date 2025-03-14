import BlogCard from "../BlogCard/BlogCard";

import styles from "./BlogMasonry.module.scss";

export default function BlogMasonry({ articles, users }) {
  return (
    <div className={styles.masonry}>
      {articles.map((article) => {
        const author = users?.find((user) => user.id === article.userId);

        return (
          <BlogCard
            key={article.id}
            article={article}
            author={author}
            className={styles["masonry-item"]}
          />
        );
      })}
    </div>
  );
}
