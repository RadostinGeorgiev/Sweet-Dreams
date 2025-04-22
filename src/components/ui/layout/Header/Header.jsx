import { Link, NavLink, useNavigate } from "react-router";

import { Container, Group, Image, Button, Burger, Drawer, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserDown, IconUserPlus, IconUserShare } from "@tabler/icons-react";

import { useAuth } from "../../../../context/AuthContext";
import { UserInfo } from "../../elements/UserInfo/UserInfo";

import styles from "./Header.module.scss";
import logo from "/images/logo1.png";
import { useCallback } from "react";

const mainLinks = [
  { link: "/", label: "Home" },
  { link: "/blog", label: "Blog" },
  { link: "/recipes", label: "Recipes" },
  { link: "/personal", label: "Personal", authRequired: true },
  { link: "/contacts", label: "Contacts" },
];

function Menu({
  variant = "horizontal", // 'horizontal' | 'vertical'
  onClose,
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
        onClick={() => onClose?.()}
        className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
      >
        <span className={styles.linkInner}>{item.label}</span>{" "}
      </NavLink>
    ));

  return <Flex {...wrapperProps}>{menuItems}</Flex>;
}

function Buttons({
  variant = "horizontal", // 'horizontal' | 'vertical'
  onClose,
}) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const buttonsProps =
    variant === "horizontal"
      ? { direction: "row", justify: "flex-end", gap: "md", align: "center" }
      : { direction: "column", justify: "center", gap: "md", grow: true, pt: "xl", pb: "xl", px: "md" };

  const handleLogout = useCallback(() => {
    onClose?.();
    navigate("/");

    setTimeout(() => {
      logout();
    }, 500);
  }, [onClose, navigate, logout]);

  return (
    <Flex {...buttonsProps}>
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
            onClick={() => onClose?.()}
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
            onClick={() => onClose?.()}
            component={Link}
            to="/register"
          >
            Register
          </Button>
        </>
      )}
    </Flex>
  );
}

export default function Header() {
  const [opened, { toggle, close: closeDrawer }] = useDisclosure(false);

  return (
    <Container size="xl" mb="xl" className={styles.header}>
      <Group justify="space-between" align="center" mt="md" className={styles.inner}>
        <Link to="/">
          <Image h={60} w="auto" fit="fill" src={logo} alt="Logo" className={styles.logo} />
        </Link>

        <Group visibleFrom="md" style={{ alignSelf: "flex-end" }}>
          <Menu variant="horizontal" />
        </Group>

        <Group visibleFrom="md" gap="md">
          <Buttons variant="horizontal" />
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="md" />
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
        <Menu variant="vertical" onClose={closeDrawer} />
        <Buttons variant="vertical" onClose={closeDrawer} />
      </Drawer>
    </Container>
  );
}
