import BlogCard from "../../elements/BlogCard/BlogCard";

import styles from "./BlogMasonry.module.scss";

export default function BlogMasonry({ articles }) {
  return (
    <div className={styles.masonry}>
      {articles?.map((article) => (
        <BlogCard
          key={article._id}
          article={article}
          className={styles["masonry-item"]}
        />
      ))}
    </div>
  );
}
