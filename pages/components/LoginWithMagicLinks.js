import { Stytch } from '@stytch/stytch-react';
import React from 'react';

const magicLinksView = {
  products: ["emailMagicLinks"],
  emailMagicLinksOptions: {
    loginRedirectURL: 'http://localhost:3000/api/authenticate_magic_link',
    loginExpirationMinutes: 30,
    signupRedirectURL: 'http://localhost:3000/api/authenticate_magic_link',
    signupExpirationMinutes: 30,
    createUserAsPending: false,
  },
};

const LoginWithMagicLinks = ({ styles, publicToken, sdkStyle, callbacks }) => {
  return (
    <div className={styles.stytchContainer}>
      <h2> Sign up or log in</h2>
      <p> Enter your email address to receive an Email Magic Link for authentication.</p>
      <Stytch
        publicToken={publicToken || ''}
        loginOrSignupView={magicLinksView}
        style = {sdkStyle}
        callbacks={callbacks}
      />
    </div>
  );
};

export default LoginWithMagicLinks;
