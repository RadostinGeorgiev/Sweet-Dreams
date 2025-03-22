import { Card, Text } from "@mantine/core";

export default function AsideContent() {
  return (
    <Card padding="lg" radius="0">
      <Text weight={600} size="lg">
        Популярни категории
      </Text>
      <ul>
        <li>Веган рецепти</li>
        <li>Здравословно хранене</li>
        <li>Бързи закуски</li>
        <li>Десерти</li>
      </ul>
    </Card>
  );
}
