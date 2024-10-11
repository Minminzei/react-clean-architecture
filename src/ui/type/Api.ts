import { KeyedMutator } from "swr";

type ResponseSuccess<T = void> = {
  type: "success";
  code: number;
  data: T;
};

type ResponseFail<E> = {
  type: "fail";
  code: number | null;
  message: string | null;
  data: E | null;
};

export type Response<T = null, E = null> = ResponseSuccess<T> | ResponseFail<E>;

export type SwrErrorResponse = {
  code: number;
  message: string;
};

export type SwrReturnType<T, E = SwrErrorResponse> = {
  data: T | null;
  mutate: KeyedMutator<T> | null;
  isLoading: boolean;
  error: E | null;
};

export type ApiPathObject = {
  [key in "create" | "update" | "destroy" | "index" | "show"]?:
    | string
    | ((...args: string[]) => string);
};
