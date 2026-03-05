import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen() {
    const { user, logout } = useAuthStore();
    const [refreshing, setRefreshing] = useState(false);
    const [stats, setStats] = useState({
        rooms: 0,
        matches: 0,
        messages: 0,
    });

    const fetchStats = async () => {
        try {
            // Mocking stats for now, in real app call API
            // const res = await api.get('/user/stats');
            setStats({
                rooms: 12,
                matches: 5,
                messages: 3,
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchStats();
        setRefreshing(false);
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary.DEFAULT]} />
                }
            >
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcomeText}>Hello,</Text>
                        <Text style={styles.userName}>{user?.name || 'User'} 👋</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationBtn}>
                        <MaterialCommunityIcons name="bell-outline" size={24} color={colors.neutral[700]} />
                        <View style={styles.badge} />
                    </TouchableOpacity>
                </View>

                <View style={styles.statsRow}>
                    <Card style={styles.statCard}>
                        <MaterialCommunityIcons name="home-outline" size={28} color={colors.primary.DEFAULT} />
                        <Text style={styles.statNumber}>{stats.rooms}</Text>
                        <Text style={styles.statLabel}>Rooms</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <MaterialCommunityIcons name="heart-outline" size={28} color="#ec4899" />
                        <Text style={styles.statNumber}>{stats.matches}</Text>
                        <Text style={styles.statLabel}>Matches</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <MaterialCommunityIcons name="chat-outline" size={28} color={colors.secondary.DEFAULT} />
                        <Text style={styles.statNumber}>{stats.messages}</Text>
                        <Text style={styles.statLabel}>Chats</Text>
                    </Card>
                </View>

                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.actionsGrid}>
                    <TouchableOpacity style={styles.actionItem}>
                        <View style={[styles.actionIcon, { backgroundColor: '#eef2ff' }]}>
                            <MaterialCommunityIcons name="account-search" size={24} color="#4f46e5" />
                        </View>
                        <Text style={styles.actionLabel}>Find Roommates</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionItem}>
                        <View style={[styles.actionIcon, { backgroundColor: '#f0fdf4' }]}>
                            <MaterialCommunityIcons name="plus-box" size={24} color="#16a34a" />
                        </View>
                        <Text style={styles.actionLabel}>List a Room</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionItem}>
                        <View style={[styles.actionIcon, { backgroundColor: '#fff7ed' }]}>
                            <MaterialCommunityIcons name="message-text" size={24} color="#ea580c" />
                        </View>
                        <Text style={styles.actionLabel}>Aangan AI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionItem}>
                        <View style={[styles.actionIcon, { backgroundColor: '#fdf2f8' }]}>
                            <MaterialCommunityIcons name="shield-check" size={24} color="#db2777" />
                        </View>
                        <Text style={styles.actionLabel}>Safety Tips</Text>
                    </TouchableOpacity>
                </View>

                <Card style={styles.promoCard}>
                    <View style={styles.promoContent}>
                        <Text style={styles.promoTitle}>Verification Status</Text>
                        <Text style={styles.promoDesc}>Verify your identity to build trust with potential roommates.</Text>
                        <Button
                            title="Get Verified"
                            onPress={() => { }}
                            size="sm"
                            style={styles.promoBtn}
                        />
                    </View>
                    <MaterialCommunityIcons name="shield-account" size={60} color={colors.primary.DEFAULT} style={styles.promoIcon} />
                </Card>

                <Button
                    variant="outline"
                    title="Logout"
                    onPress={logout}
                    style={styles.logoutBtn}
                    variant="danger"
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    welcomeText: {
        fontSize: 16,
        color: colors.neutral[500],
    },
    userName: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.neutral[900],
    },
    notificationBtn: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.neutral[100],
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.error,
        borderWidth: 2,
        borderColor: colors.white,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    statCard: {
        width: '31%',
        alignItems: 'center',
        paddingVertical: 16,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.neutral[900],
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        color: colors.neutral[500],
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.neutral[900],
        marginBottom: 16,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    actionItem: {
        width: '48%',
        backgroundColor: colors.neutral[50],
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.neutral[100],
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.neutral[700],
        textAlign: 'center',
    },
    promoCard: {
        flexDirection: 'row',
        marginBottom: 32,
        backgroundColor: colors.primary[50],
        borderColor: colors.primary[100],
    },
    promoContent: {
        flex: 1,
    },
    promoTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.primary[900],
        marginBottom: 4,
    },
    promoDesc: {
        fontSize: 14,
        color: colors.primary[700],
        marginBottom: 12,
        lineHeight: 20,
    },
    promoBtn: {
        alignSelf: 'flex-start',
    },
    promoIcon: {
        marginLeft: 12,
        alignSelf: 'center',
        opacity: 0.8,
    },
    logoutBtn: {
        marginTop: 20,
    },
});
