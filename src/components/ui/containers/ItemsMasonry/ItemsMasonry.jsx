import PostCard from "../../elements/PostCard/PostCard";

import styles from "./ItemsMasonry.module.scss";

export default function ItemsMasonry({ subject }) {
  return (
    <div className={styles.masonry}>
      {subject?.map((item) => (
        <PostCard key={item._id} article={item} className={styles["masonry-item"]} />
      ))}
    </div>
  );
}
