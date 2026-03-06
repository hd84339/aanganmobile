import { useAuthStore } from '@/store/authStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

let GoogleSignin: any;
try {
    GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin;
} catch (e) {
    GoogleSignin = null;
}

export default function SignupScreen() {
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState('');

    const login = useAuthStore((state) => state.login);

    const handleGoogleSignup = async () => {
        if (!GoogleSignin) {
            setError('Google Sign-In is only available on physical devices with a development build.');
            return;
        }

        setGoogleLoading(true);
        setError('');

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const idToken = userInfo.data?.idToken;

            if (idToken) {
                await login('google_test_token');
                router.replace('/(app)/dashboard' as any);
            }
        } catch (err: any) {
            console.log('Google Sign-In Error:', err);
            if (err.code !== 'SIGN_IN_CANCELLED') {
                setError('Google sign-up failed. Please try again.');
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join Aangan to find roommates and rooms near you with a single tap.</Text>
                </View>

                <View style={styles.form}>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TouchableOpacity
                        style={[styles.googleButton, googleLoading && styles.disabledButton]}
                        onPress={handleGoogleSignup}
                        disabled={googleLoading}
                    >
                        {googleLoading ? (
                            <ActivityIndicator color="#333333" />
                        ) : (
                            <>
                                <MaterialCommunityIcons name="google" size={24} color="#db4437" style={styles.googleIcon} />
                                <Text style={styles.googleButtonText}>Sign Up with Google</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/(auth)/login' as any)}>
                        <Text style={styles.linkText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 24,
        left: 24,
        width: 40,
        height: 40,
        justifyContent: 'center',
        zIndex: 10,
    },
    header: {
        marginBottom: 60,
        marginTop: 40,
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        lineHeight: 24,
    },
    form: {
        width: '100%',
        marginBottom: 40,
    },
    errorText: {
        color: '#ef4444',
        marginBottom: 16,
        textAlign: 'center',
    },
    disabledButton: {
        opacity: 0.7,
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 16,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    googleIcon: {
        marginRight: 12,
    },
    googleButtonText: {
        color: '#374151',
        fontSize: 17,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    footerText: {
        color: '#6b7280',
        fontSize: 15,
    },
    linkText: {
        color: '#4f46e5',
        fontSize: 15,
        fontWeight: '700',
    },
});
