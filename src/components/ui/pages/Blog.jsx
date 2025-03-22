import { Container, Grid } from "@mantine/core";

import { Outlet } from "react-router";
import AsideContent from "../containers/AsideContent";

export default function Blog() {
  return (
    <Container size="xl" mt="md">
      <h1>Blog List</h1>
      <Grid>
        <Grid.Col span={9}>
          <Outlet />
        </Grid.Col>

        <Grid.Col span={3}>
          <AsideContent />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
