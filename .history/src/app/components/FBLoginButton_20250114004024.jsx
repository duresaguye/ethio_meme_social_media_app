import React, { useEffect } from 'react';

const FacebookLoginButton = ({ handleFacebookLogin }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;

    script.onload = () => {
      if (window.FB) {
        // Initialize Facebook SDK
        window.FB.init({
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID, // Your Facebook App ID
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v16.0', // Use the latest Facebook Graph API version
        });
      } else {
        console.error('Facebook SDK not loaded');
      }
    };

    script.onerror = (error) => {
      console.error('Failed to load Facebook SDK', error);
    };

    document.body.appendChild(script);

    // Cleanup the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLoginClick = () => {
    if (window.FB) {
      window.FB.login(
        (response) => {
          if (response.authResponse) {
            handleFacebookLogin(response.authResponse); // Send the token to the parent component
          } else {
            console.error('User cancelled login or did not fully authorize.');
          }
        },
        { scope: 'email,public_profile' } // Permissions you need
      );
    } else {
      console.error('Facebook SDK not initialized');
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        onClick={handleLoginClick}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Login with Facebook
      </button>
    </div>
  );
};

export default FacebookLoginButton;
