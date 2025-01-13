import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

const FacebookLoginButton = () => {
  const router = useRouter();
  const { handleFacebookLogin } = useAuth();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.onload = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v10.0',
      });

      window.FB.Event.subscribe('auth.statusChange', handleFacebookLogin);
    };

    script.onerror = (error) => {
      console.error('Failed to load Facebook SDK', error);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [handleFacebookLogin]);

  return (
    <div>
      <div
        className="fb-login-button"
        data-width=""
        data-size="large"
        data-button-type="login_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="false"
      ></div>
    </div>
  );
};

export default FacebookLoginButton;