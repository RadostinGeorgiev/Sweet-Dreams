import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import { Image, Anchor, Container, Group, Button } from "@mantine/core";
import { IconUserDown, IconUserPlus, IconUserShare } from "@tabler/icons-react";

import styles from "./Header.module.scss";

import logo from "/images/logo1.png";
import { UserInfo } from "../../elements/UserInfo/UserInfo";
import { useAuth } from "../../../../context/AuthContext";

const mainLinks = [
  { link: "/", label: "Home" },
  { link: "/blog", label: "Blog" },
  { link: "/recipes", label: "Recipes" },
  { link: "/personal", label: "Personal Publications" },
  // { link: "/project", label: "Project Design" },
];

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [active, setActive] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let index = mainLinks.findIndex((link) => link.link === path);

    if (index === -1) {
      if (path.startsWith("/blog")) {
        index = mainLinks.findIndex((link) => link.link === "/blog");
      } else if (path.startsWith("/recipes")) {
        index = mainLinks.findIndex((link) => link.link === "/recipes");
      }
    }

    setActive(index);
  }, [location.pathname]);

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
    <Container size="xl" mb="xl">
      <Group justify="space-between" align="center" mt="md">
        <Image
          h={60}
          w="auto"
          fit="fill"
          src={logo}
          alt="Logo"
          className={styles.logo}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isAuthenticated ? (
            <Group justify="flex-end" align="center">
              <UserInfo user={user} />
              <Button
                variant="filled"
                size="compact-md"
                radius="0"
                leftSection={<IconUserShare size={16} />}
                className={styles.button}
                onClick={() => logout()}
                component={Link}
                to="/"
              >
                Log out
              </Button>
            </Group>
          ) : (
            <Group justify="flex-end" align="center">
              <Button
                variant="outline"
                size="compact-md"
                radius="0"
                leftSection={<IconUserDown size={16} />}
                className={styles.button}
                component={Link}
                to="/login"
              >
                Log in
              </Button>
              <Button
                variant="filled"
                size="compact-md"
                radius="0"
                leftSection={<IconUserPlus size={16} />}
                className={styles.button}
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </Group>
          )}

          <Group gap={0} justify="center">
            {menuItems}
          </Group>
        </div>
      </Group>
    </Container>
  );
}
