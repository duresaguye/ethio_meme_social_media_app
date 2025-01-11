import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/token/refresh/", {
          method: "POST",
          credentials: "include", // Include HttpOnly cookies
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("Access token refreshed:", data.access);
          setIsAuthenticated(true);
        } else {
          console.error("Failed to refresh token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during token refresh:", error);
        setIsAuthenticated(false);
      }
    };
    

    checkAuth();
  }, []);

  const handleGoogleLogin = async (response) => {
    if (response.credential) {
      try {
        const res = await fetch("http://localhost:8000/api/google-login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token: response.credential }),
        });

        const data = await res.json();
        if (res.ok) {
          // Store tokens in local storage or cookies if needed
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          setIsAuthenticated(true); // Update authentication state
        } else {
          console.error("Google login failed:", data);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying Google token:", error);
        setIsAuthenticated(false);
      }
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