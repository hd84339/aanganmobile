import { useAuthStore } from '@/store/authStore';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
    const logout = useAuthStore((state) => state.logout);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <Text style={styles.subtitle}>Welcome to Aangan Mobile</Text>
            <View style={styles.spacer} />
            <Button title="Logout" onPress={logout} color="#ef4444" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9fafb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        marginTop: 5,
    },
    spacer: {
        height: 40,
    },
});
