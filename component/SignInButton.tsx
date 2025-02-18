// components/SignInButton.tsx
import React from 'react';

const SignInButton: React.FC = () => {
    const handleSignIn = () => {
        window.location.href = '/api/auth/fitbit';
    };

    return <button onClick={handleSignIn}>Sign In with Fitbit</button>;
};

export default SignInButton;
