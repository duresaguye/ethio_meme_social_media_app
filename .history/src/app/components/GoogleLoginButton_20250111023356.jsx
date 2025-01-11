import React, { useEffect } from 'react';

const GoogleLoginButton = ({ handleGoogleLogin }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,  
                    callback: handleGoogleLogin,
                });

                window.google.accounts.id.renderButton(
                    document.getElementById("googleSignInButton"),
                    { theme: "outline", size: "large" }
                );
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
        <div id="googleSignInButton" className="flex justify-center items-center mt-4">
            {/* The Google button will be rendered inside this div */}
        </div>
    );
};

export default GoogleLoginButton;
