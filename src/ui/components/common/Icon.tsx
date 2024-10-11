import {
  PersonOutlined,
  CloseOutlined,
  GTranslateOutlined,
  RefreshOutlined,
} from "@mui/icons-material";
import { cn } from "@/ui/lib/shadcn";

export type IconName = "account" | "close" | "translate" | "loader";

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
};

export function Icon({
  name,
  className = "",
  size = 24,
  color = "#000000",
}: Props) {
  switch (name) {
    case "account":
      return (
        <PersonOutlined
          className={cn(className)}
          sx={{
            fontSize: size,
            color,
          }}
        />
      );
    case "close":
      return (
        <CloseOutlined
          className={cn(className)}
          sx={{
            fontSize: size,
            color,
          }}
        />
      );
    case "translate":
      return (
        <GTranslateOutlined
          className={cn(className)}
          sx={{
            fontSize: size,
            color,
          }}
        />
      );
    case "loader":
      return (
        <RefreshOutlined
          className={cn(className)}
          sx={{
            fontSize: size,
            color,
          }}
        />
      );
    default:
      return null;
  }
}
