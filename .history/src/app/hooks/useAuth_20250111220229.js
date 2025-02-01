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

  const { data, error, isLoading } = useQuery("auth", checkAuth, {
    onSuccess: () => setIsAuthenticated(true),
    onError: () => setIsAuthenticated(false),
  });

  const handleGoogleLogin = useMutation(
    async (response) => {
      if (response.credential) {
        const res = await fetch("http://localhost:8000/api/google-login/", {
         method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token: response.credential }),
        });

        if (!res.ok) {
          throw new Error("Google login failed");
        }

        return res.json();
      }
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        setIsAuthenticated(true);
        queryClient.invalidateQueries("auth");
      },
      onError: (error) => {
        console.error("Error verifying Google token:", error);
        setIsAuthenticated(false);
      },
    }
  );

  const logout = useMutation(
    async () => {
      const response = await fetch("http://localhost:8000/api/logout/", {
       method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      return response.json();
    },
    {
      onSuccess: () => {
        setIsAuthenticated(false);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        queryClient.invalidateQueries("auth");
      },
      onError: (error) => {
        console.error("Error during logout:", error);
      },
    }
  );

  return {
    isAuthenticated,
    isLoading,
    handleGoogleLogin: handleGoogleLogin.mutate,
    logout: logout.mutate,
  };
};