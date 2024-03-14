import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { logOutScenario, useAuthData } from "@/utils/auth";

export function ProfileOptions() {
  const { avatar_url } = useAuthData();
  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform w-8 h-8"
            src={avatar_url}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          {/*<DropdownItem key="settings">My Settings</DropdownItem>*/}
          <DropdownItem
            key="logout"
            color="danger"
            onClick={() => {
              logOutScenario();
            }}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
