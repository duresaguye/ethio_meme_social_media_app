import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates loading state
  const queryClient = useQueryClient();

  const checkAuth = async () => {
    const response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      credentials: "include", // Include credentials to send cookies
    });

    if (!response.ok) {
      throw new Error("Not authenticated");
    }

    return response.json();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
    onSuccess: () => setIsAuthenticated(true),
    onError: () => setIsAuthenticated(false),
  });

  const handleGoogleLogin = useMutation({
    mutationFn: async (response) => {
      if (response.credential) {
        const res = await fetch("http://localhost:8000/api/google-login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token: response.credential }),
          credentials: "include", // Include credentials to send cookies
        });

        if (!res.ok) {
          throw new Error("Google login failed");
        }

        return res.json();
      }
    },
    onSuccess: (data) => {
      setIsAuthenticated(true);
      queryClient.invalidateQueries("auth");
    },
    onError: (error) => {
      console.error("Error verifying Google token:", error);
      setIsAuthenticated(false);
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        credentials: "include", // Include credentials to send cookies
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      return response.json();
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      queryClient.invalidateQueries("auth");
    },
    onError: (error) => {
      console.error("Error during logout:", error);
    },
  });

  return {
    isAuthenticated,
    isLoading,
    handleGoogleLogin: handleGoogleLogin.mutate,
    logout: logout.mutate,
  };
};