import React, { useState } from "react";

import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import { LoginSocialGoogle } from "reactjs-social-login";

const Login = () => {
  // const REDIRECT_URI = window.location.href;
  const [provider, setProvider] = useState(null);
  const [profile, setProfile] = useState(null);

  return (
    <>
      {!profile ? (
        <div>
          <h1>Login with Social ID</h1>
          <LoginSocialFacebook
            appId={process.env.REACT_APP_FB_APP_ID || "614493040846811"}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
              console.log("Provider is:", provider);
              console.log("Data is :", data);
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>

          <LoginSocialGoogle
            client_id={
              process.env.REACT_APP_GG_APP_ID ||
              "339571266347-n916foetgf4q24gt0rjcvfiff1oc3adj.apps.googleusercontent.com"
            }
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="online"
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
              console.log("Provider is:", provider);
              console.log("Data is :", data);
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>
        </div>
      ) : (
        <div>
          Name:{profile.name} <br />
          {provider === "facebook" ? (
            <img src={profile.picture.data.url} alt={profile.name} />
          ) : (
            <img src={profile.picture} alt={profile.name} />
          )}
        </div>
      )}
    </>
  );
};

export default Login;
