import { useAuthStore } from '@/store/authStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Defensive import for native module
let GoogleSignin: any;
try {
    GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin;
} catch (e) {
    GoogleSignin = null;
}

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState('');

    const login = useAuthStore((state) => state.login);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // For now, simulate a login based on instructions
            await login('test_token_for_now');
            router.replace('/(app)/dashboard' as any);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        if (!GoogleSignin) {
            setError('Google Sign-In is only available on physical devices with a development build. Please use email/password for testing.');
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
                setError('Google sign-in failed. Please try again or use email/password.');
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <View style={styles.header}>
                        <MaterialCommunityIcons name="home-heart" size={64} color="#4f46e5" />
                        <Text style={styles.title}>Aangan</Text>
                        <Text style={styles.subtitle}>Welcome back! Please login to your account.</Text>
                    </View>

                    <View style={styles.form}>
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="email-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email Address"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="lock-outline" size={20} color="#9ca3af" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.primaryButton, loading && styles.disabledButton]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text style={styles.primaryButtonText}>Sign In</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.divider} />
                        </View>

                        <TouchableOpacity
                            style={[styles.googleButton, googleLoading && styles.disabledButton]}
                            onPress={handleGoogleLogin}
                            disabled={googleLoading}
                        >
                            {googleLoading ? (
                                <ActivityIndicator color="#333333" />
                            ) : (
                                <>
                                    <MaterialCommunityIcons name="google" size={20} color="#db4437" style={styles.googleIcon} />
                                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/signup' as any)}>
                            <Text style={styles.linkText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#4f46e5',
        marginTop: 16,
        marginBottom: 8,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    errorText: {
        color: '#ef4444',
        marginBottom: 16,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#111827',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotText: {
        color: '#4f46e5',
        fontWeight: '600',
    },
    primaryButton: {
        backgroundColor: '#4f46e5',
        borderRadius: 12,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#4f46e5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    disabledButton: {
        opacity: 0.7,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    dividerText: {
        color: '#9ca3af',
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: '600',
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleIcon: {
        marginRight: 12,
    },
    googleButtonText: {
        color: '#374151',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
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
