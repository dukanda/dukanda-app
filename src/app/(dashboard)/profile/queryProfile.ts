"use client";
import { authRoutes } from "@/api/routes/Auth/index.routes";
import { useQuery } from "@tanstack/react-query";

export const ProfileMutation = () => {

  const userLogged = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      return await authRoutes.getCurrentUser() ;
    },
  })

  return {
    userLogged,
  };
};
