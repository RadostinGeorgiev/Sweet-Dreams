import BlogCard from "../../elements/BlogCard/BlogCard";

import styles from "./ItemsMasonry.module.scss";

export default function ItemsMasonry({ subject }) {
  return (
    <div className={styles.masonry}>
      {subject?.map((item) => (
        <BlogCard
          key={item._id}
          article={item}
          className={styles["masonry-item"]}
        />
      ))}
    </div>
  );
}
