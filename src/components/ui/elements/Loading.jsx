import { Flex, Image } from "@mantine/core";

export default function Loading() {
  return (
    <Flex h="100dvh" justify="center" align="center">
      <Image src="./images/loading.gif" />
    </Flex>
  );
}
