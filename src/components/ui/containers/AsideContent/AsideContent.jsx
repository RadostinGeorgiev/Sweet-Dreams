import { Button, Card, List, ListItem, Text } from "@mantine/core";
import { Link } from "react-router";

import styles from "./AsideContent.module.scss";

const category = ["Food presentation", "Gourmet", "Cooking Tips", "Food Travel", "Food Stories"];

export default function AsideContent() {
  return (
    <Card padding="lg" radius="0">
      <Text weight={600} size="lg">
        Categories
      </Text>
      <List className={styles.widget}>
        {category.map((item, index) => (
          <ListItem key={index}>
            <Button
              variant="outline"
              size="compact-xs"
              radius="0"
              tt="uppercase"
              className={styles.property}
              component={Link}
              to={`/blog?where=category in ("${item}")`}
            >
              {item}
            </Button>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
