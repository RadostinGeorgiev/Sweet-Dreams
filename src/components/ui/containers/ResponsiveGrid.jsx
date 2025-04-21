import { Grid } from "@mantine/core";

export default function ResponsiveGrid({ items, maxColumns = 1, CardComponent }) {
  const getCardSize = () => {
    if (maxColumns >= 4) return "small";
    if (maxColumns === 3) return "medium";
    return "large";
  };

  return (
    <Grid gutter="xs">
      {items?.map((item) => (
        <Grid.Col
          key={item._id}
          span={{
            base: 12,
            sm: 6,
            md: 12 / maxColumns,
          }}
        >
          <CardComponent data={item} size={getCardSize()} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
