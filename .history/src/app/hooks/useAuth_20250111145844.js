import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const refreshToken = localStorage.getItem("refresh_token"); // or get it from cookies
    
        const response = await fetch("http://localhost:8000/api/token/refresh/", {
         method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
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
      fetch("http://localhost:8000/api/auth/google/", {
       method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.credential }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
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
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return { isAuthenticated, handleGoogleLogin, logout };
};