import React, { useEffect } from 'react';

const GoogleLoginButton = ({ handleGoogleLogin }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;

    script.onload = () => {
      if (window.google?.accounts?.id) { // Ensure library loaded
        const clientId = import.meta.env.GOOGLE_CLIENT_ID;
        if (!clientId) {
          console.error('Google Client ID is not provided');
          return;
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleLogin,
        });

        const buttonDiv = document.getElementById("googleSignInButton");
        if (buttonDiv) {
          window.google.accounts.id.renderButton(
            buttonDiv,
            { theme: "outline", size: "large" }
          );
        } else {
          console.error('GoogleSignInButton div not found');
        }
      } else {
        console.error('Google Identity Services library not loaded');
      }
    };

    script.onerror = (error) => {
      console.error('Failed to load Google login script', error);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [handleGoogleLogin]);

  return (
    <div id="googleSignInButton" className="flex justify-center items-center mt-4">
      {/* The Google button will be rendered here */}
    </div>
  );
};

export default GoogleLoginButton;
