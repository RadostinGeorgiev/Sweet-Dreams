import BlogCard from "../BlogCard/BlogCard";

import styles from "./BlogList.module.scss";

export default function BlogList({ articles }) {
  return (
    <div className={styles.masonry}>
      {articles.map((article) => (
        <BlogCard
          key={article.id}
          className={styles["masonry-item"]}
          post={article}
        />
      ))}
    </div>
  );
}
