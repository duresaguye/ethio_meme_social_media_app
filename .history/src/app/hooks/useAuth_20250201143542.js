import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/token/refresh/", {
          method: "POST",
          credentials: "include"// Include credentials to send cookies
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
const handleSignup = async (username, password, email) => {
  try {
    const response = await fetch("http://localhost:8000/api/signup/", {
     method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      alert("Signup successful!");
      console.log("Signup successful:", data.message);
      router.push('/profile'); // Redirect to the profile page
    } else {
      const errorData = await response.json();
      console.error("Signup failed:", errorData);
      alert("Signup failed: " + JSON.stringify(errorData));
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("An error occurred. Please try again.");
  }
}
  const handleGoogleLogin = async (response) => {
    if (response.credential) {
      try {
        const res = await fetch("http://localhost:8000/api/google-login/", {
         method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token: response.credential }),
          credentials: "include",
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
  const handleFacebookLogin = async (response) => {
    console.log("Facebook login response received:", response); // Check response object
    
    if (response.status !== 'unknown') {
      try {
        console.log("Sending Facebook access token to server...");
        const accessToken = response.authResponse.accessToken;
        
        const res = await fetch("http://localhost:8000/api/facebook-login/", {
         method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ access_token: accessToken }),
          credentials: "include", // To send cookies (if any) with the request
        });

        const data = await res.json();
        console.log("Server response:", res.status, data); // Log server response

        if (res.ok) {
          console.log("Login successful, updating local storage and navigating...");
          setIsAuthenticated(true); // Update authentication state
        } else {
          console.error("Facebook login failed:", data);
          alert("Facebook login failed: " + JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error during Facebook login:", error);
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

  return { isAuthenticated, handleGoogleLogin,  handleFacebookLogin,logout, handleSignup };
};