import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRegisterUser = () => {
  const mutationFn = async (payload: any) => {
    const data = JSON.stringify(payload);
    return await axios.post("/api/register", data);
  };
  const {
    mutate,
    mutateAsync,
    isPending: isLoading,
    data,
  } = useMutation({ mutationFn: mutationFn });

  return { mutate, mutateAsync, isLoading, data };
};

export const useValidateUser = () => {
  const mutationFn = async (payload: any) => {
    const data = JSON.stringify(payload);
    return await axios.post("/api/userExist", data);
  };
  const {
    mutate,
    mutateAsync,
    isPending: isLoading,
    data,
  } = useMutation({ mutationFn: mutationFn });

  return { mutate, mutateAsync, isLoading, data };
};
