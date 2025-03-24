import { Avatar, Group, Text } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

import styles from "./UserInfo.module.scss";

export function UserInfo({ user }) {
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar src={user.image} size={48} radius="xl" />
        <div className={styles.text}>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {user.role}
          </Text>

          <Text fz="lg" fw={500} className={styles.name}>
            {user.firstName} {user.lastName}
          </Text>

          <Group wrap="nowrap" gap={10}>
            <IconAt stroke={1.5} size={16} className={styles.icon} />
            <Text fz="md" c="dimmed">
              {user.email}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
