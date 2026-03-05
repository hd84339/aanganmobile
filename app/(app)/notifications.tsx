import { Loader } from '@/components/ui/Loader';
import { colors } from '@/utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const MOCK_NOTIFICATIONS = [
    { id: '1', type: 'match', title: 'New Match!', message: 'You and Rahul Sharma are a match. Start a conversation!', time: '10m ago', read: false, icon: 'heart-outline', color: '#ec4899' },
    { id: '2', type: 'message', title: 'New Message', message: 'Rahul: Hey, is the room still available?', time: '2m ago', read: false, icon: 'chat-outline', color: colors.secondary.DEFAULT },
    { id: '3', type: 'system', title: 'Profile Verified', message: 'Your profile has been successfully verified by Aangan Team.', time: '2 days ago', read: true, icon: 'shield-check-outline', color: colors.primary.DEFAULT },
];

export default function NotificationsScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const renderNotification = ({ item }: { item: typeof MOCK_NOTIFICATIONS[0] }) => (
        <TouchableOpacity
            style={[styles.notificationItem, !item.read && styles.unreadItem]}
        >
            <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
            </View>
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.notifTitle}>{item.title}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>Notifications</Text>
                <TouchableOpacity>
                    <Text style={styles.markRead}>Mark all as read</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <Loader fullScreen={false} />
            ) : (
                <FlatList
                    data={MOCK_NOTIFICATIONS}
                    renderItem={renderNotification}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <MaterialCommunityIcons name="bell-off-outline" size={64} color={colors.neutral[300]} />
                            <Text style={styles.emptyText}>You're all caught up! No new notifications.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        paddingBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.neutral[900],
    },
    markRead: {
        fontSize: 14,
        color: colors.primary.DEFAULT,
        fontWeight: '600',
    },
    list: {
        paddingHorizontal: 0,
    },
    notificationItem: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral[50],
    },
    unreadItem: {
        backgroundColor: colors.primary[50] + '30',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        marginLeft: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    notifTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.neutral[900],
    },
    time: {
        fontSize: 12,
        color: colors.neutral[500],
    },
    message: {
        fontSize: 14,
        color: colors.neutral[600],
        lineHeight: 20,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary.DEFAULT,
        marginLeft: 12,
    },
    emptyContainer: {
        marginTop: 100,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 15,
        color: colors.neutral[500],
        textAlign: 'center',
        lineHeight: 22,
    },
});
