import { useColumns } from "../../../../hooks/useColumns";
import styles from "./ItemsMasonry.module.scss";

export default function ItemsMasonry({ items, maxColumns = 3, CardComponent }) {
  const columns = useColumns(maxColumns);

  return (
    <div className={styles.masonry} style={{ columnCount: columns }}>
      {items?.map((item) => (
        <CardComponent key={item._id} data={item} className={styles["masonry-item"]} />
      ))}
    </div>
  );
}
