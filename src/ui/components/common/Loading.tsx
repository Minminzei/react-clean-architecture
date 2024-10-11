import { Icon } from "@/ui/components/common/Icon";

export function Loading({ size = 24 }: { size?: number }) {
  return <Icon className="animate-spin" name="loader" size={size} />;
}
