import { Container, Grid } from "@mantine/core";

import { Outlet } from "react-router";
import AsideContent from "../containers/AsideContent";

export default function Blog() {
  return (
    <Container size="xl" mt="md">
      <Grid>
        <Grid.Col span={9} mt="lg">
          <Outlet />
        </Grid.Col>

        <Grid.Col span={3}>
          <AsideContent />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
