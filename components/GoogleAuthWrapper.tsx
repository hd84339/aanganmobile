import React, { useEffect } from 'react';

// Defensive import for native module
let GoogleSignin: any;
try {
    GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin;
} catch (e) {
    GoogleSignin = null;
}

export default function GoogleAuthWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (GoogleSignin) {
            try {
                GoogleSignin.configure({
                    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
                    offlineAccess: true,
                    scopes: ['profile', 'email'],
                });
            } catch (e) {
                console.warn('Google Signin native module is missing (Expo Go?)');
            }
        }
    }, []);

    return <>{children}</>;
}
