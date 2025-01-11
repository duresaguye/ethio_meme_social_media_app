import React, { useEffect, useState } from 'react';

const GoogleLoginButton = ({ handleGoogleLogin }) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;

    script.onload = () => {
      setIsScriptLoaded(true);
      if (window.google?.accounts?.id) {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
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

    // Cleanup the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, [handleGoogleLogin]);

  return (
    <div className="flex justify-center items-center mt-4">
      {isScriptLoaded ? (
        <div id="googleSignInButton" />
      ) : (
        <p>Loading Google login...</p>
      )}
    </div>
  );
};

export default GoogleLoginButton;
