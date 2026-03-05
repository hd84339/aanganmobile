import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyScreen() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerify = async () => {
        if (!code || code.length < 4) {
            setError('Please enter a valid verification code');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Typically:
            // await authService.verifyEmail(code);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay

            // On success, go to dashboard
            router.replace('/(app)/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = () => {
        // authService.resendVerification()
        alert('Verification code resent to your email!');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="email-check-outline" size={48} color="#4f46e5" />
                        </View>
                        <Text style={styles.title}>Check your email</Text>
                        <Text style={styles.subtitle}>
                            We've sent a verification code to your email address. Please enter it below to verify your account.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.codeInput}
                                placeholder="Enter 6-digit code"
                                value={code}
                                onChangeText={setCode}
                                keyboardType="number-pad"
                                maxLength={6}
                                textAlign="center"
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.primaryButton, loading && styles.disabledButton]}
                            onPress={handleVerify}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text style={styles.primaryButtonText}>Verify Email</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.resendContainer}>
                            <Text style={styles.resendText}>Didn't receive the code? </Text>
                            <TouchableOpacity onPress={handleResend}>
                                <Text style={styles.resendLink}>Resend</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

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
        padding: 24,
    },
    backButton: {
        marginBottom: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconContainer: {
        width: 80,
        height: 80,
        backgroundColor: '#eff6ff',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 10,
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
        marginBottom: 24,
    },
    codeInput: {
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        height: 64,
        fontSize: 24,
        fontWeight: '600',
        color: '#111827',
        letterSpacing: 4,
    },
    primaryButton: {
        backgroundColor: '#4f46e5',
        borderRadius: 12,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
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
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    resendText: {
        color: '#6b7280',
        fontSize: 15,
    },
    resendLink: {
        color: '#4f46e5',
        fontSize: 15,
        fontWeight: '700',
    },
});
