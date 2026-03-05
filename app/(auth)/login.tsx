import { useAuthStore } from '@/store/authStore';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
    const login = useAuthStore((state) => state.login);

    const handleLogin = async () => {
        // Basic test login functionality
        await login('test_token_for_now');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aangan Mobile</Text>
            <Text style={styles.subtitle}>Welcome back!</Text>
            <View style={styles.buttonContainer}>
                <Button title="Login (Test)" onPress={handleLogin} color="#4f46e5" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9fafb',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#111827',
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 30,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
});
