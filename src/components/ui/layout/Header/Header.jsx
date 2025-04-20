import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";

import { Container, Group, Image, Button, Burger, Drawer, Flex } from "@mantine/core";
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
  variant = "horizontal", // 'horizontal' | 'vertical'
  closeDrawer,
}) {
  const { isAuthenticated } = useAuth();

  const wrapperProps =
    variant === "horizontal"
      ? {
          direction: "row",
          justify: "center",
          align: "flex-end",
          wrap: "wrap",
          gap: "sm",
        }
      : {
          direction: "column",
          align: "flex-start",
          gap: 0,
        };

  const menuItems = mainLinks
    .filter((link) => isAuthenticated || !link.authRequired)
    .map((item) => (
      <NavLink
        key={item.label}
        to={item.link}
        onClick={() => closeDrawer()}
        className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
      >
        <span className={styles.linkInner}>{item.label}</span>{" "}
      </NavLink>
    ));

  return <Flex {...wrapperProps}>{menuItems}</Flex>;
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
      : { justify: "center", grow: true, pt: "xl", pb: "xl", px: "md" };

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
  const [opened, { toggle, close: closeDrawer }] = useDisclosure(false);

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
  }, [location.pathname]);

  return (
    <Container size="xl" mb="xl" className={styles.header}>
      <Group justify="space-between" align="center" mt="md" className={styles.inner}>
        <Link to="/">
          <Image h={60} w="auto" fit="fill" src={logo} alt="Logo" className={styles.logo} />
        </Link>

        <Group visibleFrom="sm">
          <Menu />
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
        <Menu variant="vertical" closeDrawer={closeDrawer} />
        <Buttons variant="vertical" closeMenu={closeDrawer} />
      </Drawer>
    </Container>
  );
}
