import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/ui/components/common/Avatar";
import { Stack } from "@/ui/components/common/Stack";
import { IconButton } from "@/ui/components/common/Button";
import UserService from "@/ui/di/UserService";
import { User } from "@/domain/entities/User";

export function TranslateHeader() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User | null>(null);
  const fetch = React.useCallback(async () => {
    const userData = await UserService.get("1");
    setUser(userData);
  }, []);
  React.useEffect(() => {
    fetch();
  }, [fetch]);

  if (user === null) {
    return null;
  }
  return (
    <Stack className="pr-5" direction="row">
      <div className="flex-1 font-bold">
        <b>翻訳します</b>
      </div>
      <Avatar src={user.image} className="size-8" />
      <IconButton
        onClick={() => {
          navigate("/");
        }}
        iconName="close"
      />
    </Stack>
  );
}
