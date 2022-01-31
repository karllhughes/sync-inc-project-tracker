import { Stytch } from '@stytch/stytch-react';
import React from 'react';

const stytchPublicToken = process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN

const sdkStyle = {
    fontFamily: '"Helvetica New", Helvetica, sans-serif',
    primaryColor: '#19303d',
    primaryTextColor: '#090909',
    width: '321px',
    hideHeaderText: true,
};

const callbacks = {
    onEvent: (data) => {
    // TODO: check whether the user exists in your DB
        if (data.eventData.type === 'USER_EVENT_TYPE') {
        console.log({
            userId: data.eventData.userId,
            email: data.eventData.email,
        });
        }
    },
    onSuccess: (data) => console.log(data),
    onError: (data) => console.log(data),
};

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

const LoginWithMagicLinks = ({ styles }) => {
  return (
    <div className={styles.stytchContainer}>
      <h2> Sign up or log in</h2>
      <p> Enter your email address to receive an Email Magic Link for authentication.</p>
      <Stytch
        publicToken={stytchPublicToken || ''}
        loginOrSignupView={magicLinksView}
        style = {sdkStyle}
        callbacks={callbacks}
      />
    </div>
  );
};

export default LoginWithMagicLinks;
