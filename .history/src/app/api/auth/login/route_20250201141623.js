const handleLogin = async (username, password) => {
  const response = await fetch("http://localhost:8000/api/login/", {
   method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
    credentials: "include", // This ensures cookies are sent
  });

  if (response.ok) {
    console.log("Login successful!");
    // Redirect user or update UI
  } else {
    const data = await response.json();
    console.error("Error:", data.error);
  }
};
