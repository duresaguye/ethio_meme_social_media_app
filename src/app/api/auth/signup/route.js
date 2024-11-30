const signup = async (userData) => {
  const response = await fetch('http://localhost:4000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json();
};