const fetchData = async () => {
  const response = await fetch("http://localhost:8000/api/protected/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getCookie("access_token")}`,
    },
    credentials: "include", // This ensures cookies are sent
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    console.error("Failed to fetch protected data");
  }
};

// Helper function to get the access token from cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
