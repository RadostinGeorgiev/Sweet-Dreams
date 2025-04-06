import { Flex, Title, Text } from "@mantine/core";
import styles from "./MetaDate.module.scss";

export default function MetaDate({ date, size, color, background }) {
  if (!date) return null;
  const obj = new Date(date);
  const day = obj.getDate();
  const month = obj.toLocaleString("en-US", { month: "long" });

  return (
    <Flex
      justify="center"
      align="center"
      wrap="nowrap"
      gap="0"
      direction="column"
      className={`${styles.meta} ${styles[size]}`}
      style={{
        backgroundColor: `var(${background})`,
      }}
    >
      <Title
        order={4}
        fw={900}
        className={styles.day}
        style={{
          color: `var(${color})`,
        }}
      >
        {day}
      </Title>
      <Text
        size="sm"
        fw={600}
        tt="uppercase"
        className={styles.month}
        style={{
          color: `var(${color})`,
        }}
      >
        {month}
      </Text>
    </Flex>
  );
}
