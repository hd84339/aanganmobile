import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';

export default function GoogleAuthWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
            offlineAccess: true,
            scopes: ['profile', 'email'],
        });
    }, []);

    return <>{children}</>;
}
