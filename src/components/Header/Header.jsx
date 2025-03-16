import { useState } from "react";
import { Link } from "react-router";

import { Image, Anchor, Container, Group, Button } from "@mantine/core";

import styles from "./Header.module.scss";
import logo from "/images/logo.png";

const mainLinks = [
  { link: "/", label: "Home" },
  { link: "/recipes", label: "Recipes" },
  { link: "/tips", label: "Cooking Tips" },
  { link: "/project", label: "Project Design" },
];

export default function Header({ onRegister }) {
  const [active, setActive] = useState(0);

  const menuItems = mainLinks.map((item, index) => (
    <Anchor
      key={item.label}
      component={Link}
      to={item.link}
      data-active={index === active || undefined}
      onClick={() => {
        setActive(index);
      }}
      className={styles.link}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <Container>
      <Group justify="space-between">
        <Image
          h={60}
          w="auto"
          fit="contain"
          src={logo}
          alt="Logo"
          className={styles.logo}
        />
        <Group justify="flex-end" align="center" grow px="md">
          <Button
            variant="outline"
            size="compact-md"
            radius="0"
            className={styles.button}
          >
            Log in
          </Button>
          <Button
            variant="filled"
            size="compact-md"
            radius="0"
            className={styles.button}
            onClick={() => onRegister(true)}
          >
            Register
          </Button>
        </Group>
      </Group>
      <Group gap={0} justify="center">
        {menuItems}
      </Group>
    </Container>
  );
}
