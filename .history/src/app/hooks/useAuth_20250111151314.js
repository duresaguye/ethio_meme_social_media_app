import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/token/refresh/", {
         method: "POST",
          credentials: "include", // Include credentials to send cookies
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleGoogleLogin = (response) => {
    if (response.credential) {
      fetch("http://localhost:8000/api/google-login/", {
       method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: response.credential }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access && data.refresh) {
            // Store tokens in local storage or cookies if needed
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        })
        .catch((error) => {
          console.error("Error verifying Google token:", error);
          setIsAuthenticated(false);
        });
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout/", {
       method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(false);
        // Optionally, remove tokens from local storage or cookies
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return { isAuthenticated, handleGoogleLogin, logout };
};