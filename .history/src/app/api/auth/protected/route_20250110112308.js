import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children, render }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Null indicates loading state
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/protected/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${getCookie("access_token")}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching protected data:", error);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get the access token from cookies
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  // Handle loading state
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Conditionally render children or null based on authentication state
  return render(isAuthenticated) ? <>{children}</> : null;
};

export default ProtectedRoute;