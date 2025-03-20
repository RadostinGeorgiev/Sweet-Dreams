import { useState } from "react";
import { Link } from "react-router";

import { Image, Anchor, Container, Group, Button } from "@mantine/core";
import { IconUserDown, IconUserPlus, IconUserShare } from "@tabler/icons-react";

import styles from "./Header.module.scss";

// import { services } from "../../services/item.service";
// import { useFetch } from "../../hooks/useFetch";
// import { endpoints } from "../../../config";

import logo from "/images/logo.png";
import { UserInfo } from "../UserInfo/UserInfo";
import { authServices } from "../../services/auth.service";
import { useLogout } from "../../hooks/useAuth";

const mainLinks = [
  { link: "/", label: "Home" },
  { link: "/blog", label: "Blog" },
  { link: "/recipes", label: "Recipes" },
  { link: "/tips", label: "Cooking Tips" },
  { link: "/project", label: "Project Design" },
];

export default function Header() {
  const [active, setActive] = useState(0);

  const user = authServices.getUserData();
  const logout = useLogout();
  const isLogged = authServices.isLogged();

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
      <Group justify="space-between" align="center" mt="md">
        <Image
          h={60}
          w="auto"
          fit="contain"
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
          {isLogged ? (
            <Group justify="flex-end" align="center">
              <UserInfo user={user} />
              <Button
                variant="filled"
                size="compact-md"
                radius="0"
                leftSection={<IconUserShare size={16} />}
                className={styles.button}
                onClick={logout}
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
