import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { Image, Anchor, Container, Group, Stack, Button, Burger, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserDown, IconUserPlus, IconUserShare } from "@tabler/icons-react";

import { useAuth } from "../../../../context/AuthContext";
import { UserInfo } from "../../elements/UserInfo/UserInfo";

import styles from "./Header.module.scss";
import logo from "/images/logo1.png";

const mainLinks = [
  { link: "/", label: "Home" },
  { link: "/blog", label: "Blog" },
  { link: "/recipes", label: "Recipes" },
  { link: "/personal", label: "Personal", authRequired: true },
  { link: "/contacts", label: "Contacts" },
];

function Menu({
  menuItems,
  variant = "horizontal", // 'horizontal' | 'vertical'
}) {
  const Wrapper = variant === "horizontal" ? Group : Stack;
  const wrapperProps = variant === "horizontal" ? { justify: "center", grow: true, gap: "sm" } : { gap: 0 };

  return <Wrapper {...wrapperProps}>{menuItems}</Wrapper>;
}

function Buttons({
  variant = "horizontal", // 'horizontal' | 'vertical'
  closeMenu,
}) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const buttonsProps =
    variant === "horizontal"
      ? { justify: "flex-end", align: "center" }
      : { justify: "center", grow: true, pb: "xl", px: "md" };

  function handleLogout() {
    closeMenu?.();
    navigate("/");

    setTimeout(() => {
      logout();
    }, 500);
  }

  return (
    <Group {...buttonsProps}>
      {isAuthenticated ? (
        <>
          <UserInfo user={user} />
          <Button
            variant="filled"
            size="compact-md"
            radius="0"
            leftSection={<IconUserShare size={16} />}
            className={styles.button}
            onClick={handleLogout}
            component={Link}
            to="/"
          >
            Log out
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            size="compact-md"
            radius="0"
            leftSection={<IconUserDown size={16} />}
            className={styles.button}
            onClick={() => closeMenu?.()}
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
            onClick={() => closeMenu?.()}
            component={Link}
            to="/register"
          >
            Register
          </Button>
        </>
      )}
    </Group>
  );
}

export default function Header() {
  const { isAuthenticated } = useAuth();

  const [opened, { toggle, close: closeDrawer }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  const location = useLocation();

  const menuItems = mainLinks
    .filter((link) => isAuthenticated || !link.authRequired)
    .map((item, index) => (
      <Anchor
        key={item.label}
        component={Link}
        to={item.link}
        data-active={index === active || undefined}
        onClick={() => {
          setActive(index);
          closeDrawer();
        }}
        className={styles.link}
      >
        {item.label}
      </Anchor>
    ));

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

  return (
    <Container size="xl" mb="xl" className={styles.header}>
      <Group justify="space-between" align="center" mt="md" className={styles.inner}>
        <Image h={60} w="auto" fit="fill" src={logo} alt="Logo" className={styles.logo} />

        <Group visibleFrom="sm" gap={0}>
          <Menu menuItems={menuItems} />
        </Group>

        <Group visibleFrom="sm" gap="md">
          <Buttons variant="horizontal" />
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
      </Group>

      <Drawer
        opened={opened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000}
      >
        <Menu menuItems={menuItems} variant="vertical" />
        <Buttons variant="vertical" closeMenu={closeDrawer} />
      </Drawer>
    </Container>
  );
}
