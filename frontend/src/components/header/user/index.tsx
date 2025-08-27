import { useGetIdentity, useLogout } from "@refinedev/core";
import { Avatar, Button, Dropdown, Flex, Skeleton, Typography } from "antd";
import type { User as UserType } from "@/types";
import { useStyles } from "./styled";
import { useAuth } from "@/context/AuthProvider";

export const User = () => {
  const { styles } = useStyles();
  const { logout, user, isLoading } = useAuth()


  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "logout",
            label: (
              <Button
                style={{
                  width: "100%",
                }}
                onClick={() => logout()}
              >
                Logout
              </Button>
            ),
          },
        ],
      }}
      placement="bottom"
      arrow
    >
      <Flex align="center" gap={16}>
        <div
          style={{
            width: "114px",
          }}
        >
          <Typography.Text ellipsis className={styles.userName}>
            {isLoading ? (
              <Skeleton.Input
                style={{
                  width: "100px",
                  height: "32px",
                  borderRadius: "4px",
                }}
              />
            ) : (
              user?.name
            )}
          </Typography.Text>
        </div>
        <Avatar
          size={32}
          src={"https://randomuser.me/api/portraits/lego/5.jpg"}
          alt={user?.name}
        />
      </Flex>
    </Dropdown>
  );
};
