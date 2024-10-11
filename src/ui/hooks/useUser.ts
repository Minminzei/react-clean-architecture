import useSWR from "swr";
import { SwrReturnType, ApiPathObject } from "@/ui/type/Api";
import { User } from "@/domain/entities/User";

const paths = {
  show: (id: string) => `/users/${id}`,
} as const satisfies ApiPathObject;

type TShow = (id: string) => SwrReturnType<User>;

type ReturnType = {
  useShow: TShow;
};

export const useUser = (): ReturnType => {
  const useShow = (id: string): SwrReturnType<User> => {
    const { data, mutate, error, isLoading } = useSWR<User>(paths.show(id));
    return {
      data: data ?? null,
      mutate: mutate ?? null,
      isLoading,
      error,
    };
  };
  return { useShow };
};
