import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/token/refresh/", {
          method: "POST",
          credentials: "include", 
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

  const handleGoogleLogin = async (response) => {
    if (response.credential) {
      try {
        const res = await fetch("http://localhost:8000/api/google-login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_token: response.credential }),
        });

        const data = await res.json();
        if (res.ok) {
          console.log("Google login successful:", data);
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
    console.log("Initiating logout...");
    try {
        const response = await fetch("http://localhost:8000/api/logout/", {
            method: "POST",
            credentials: "include",
        });

        console.log("Logout response:", response.status);
        if (response.ok) {
            console.log("Logout successful. Clearing local storage...");
            setIsAuthenticated(false);
          
        } else {
            console.error("Logout failed with status:", response.status);
        }
    } catch (error) {
        console.error("Error during logout:", error);
    }
};


  return { isAuthenticated, handleGoogleLogin, logout };
};