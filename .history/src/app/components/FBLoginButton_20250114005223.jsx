import { useRouter } from 'next/router';

const FacebookLoginButton = () => {
  const router = useRouter();

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
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);

          router.push('/profile'); // Redirect to profile or home after successful login
        } else {
          console.error("Facebook login failed:", data);
          alert("Facebook login failed: " + JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error verifying Facebook token:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      console.warn("Facebook login failed or cancelled.");
      alert("Facebook login failed or cancelled.");
    }
  };

  // Initialize Facebook SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.onload = () => {
      window.FB.init({
        appId: 'your-facebook-app-id',
        cookie: true,
        xfbml: true,
        version: 'v12.0',
      });

      window.FB.AppEvents.logPageView(); // Log page view event
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup the script when the component unmounts
    };
  }, []);

  const handleFBLogin = () => {
    window.FB.login(
      (response) => handleFacebookLogin(response),
      { scope: 'public_profile,email' }
    );
  };

  return (
    <div className="facebook-login-button">
      <button onClick={handleFBLogin} className="btn btn-primary">
        Login with Facebook
      </button>
    </div>
  );
};

export default FacebookLoginButton;
