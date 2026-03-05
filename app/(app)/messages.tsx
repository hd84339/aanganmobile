import { Loader } from '@/components/ui/Loader';
import { colors } from '@/utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const MOCK_CONVERSATIONS = [
    { id: '1', name: 'Rahul Sharma', lastMessage: 'Hey, is the room still available?', time: '2m ago', unread: 2, image: 'https://i.pravatar.cc/150?u=rahul' },
    { id: '2', name: 'Priya Singh', lastMessage: 'I would love to visit tomorrow.', time: '1h ago', unread: 0, image: 'https://i.pravatar.cc/150?u=priya' },
    { id: '3', name: 'Amit Verma', lastMessage: 'Sent you the details over email.', time: 'Yesterday', unread: 0, image: 'https://i.pravatar.cc/150?u=amit' },
];

export default function MessagesScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const renderConversation = ({ item }: { item: typeof MOCK_CONVERSATIONS[0] }) => (
        <TouchableOpacity
            style={styles.conversationItem}
            onPress={() => router.push(`/(app)/messages?userId=${item.id}` as any)}
        >
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={styles.messageRow}>
                    <Text style={[styles.lastMessage, item.unread > 0 && styles.unreadMessage]} numberOfLines={1}>
                        {item.lastMessage}
                    </Text>
                    {item.unread > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadText}>{item.unread}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>Messages</Text>
                <TouchableOpacity style={styles.searchBtn}>
                    <MaterialCommunityIcons name="magnify" size={24} color={colors.neutral[700]} />
                </TouchableOpacity>
            </View>

            {loading ? (
                <Loader fullScreen={false} />
            ) : (
                <FlatList
                    data={MOCK_CONVERSATIONS}
                    renderItem={renderConversation}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <MaterialCommunityIcons name="chat-outline" size={64} color={colors.neutral[300]} />
                            <Text style={styles.emptyText}>No messages yet. Connect with someone to start chatting!</Text>
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
    searchBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.neutral[50],
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        paddingHorizontal: 16,
    },
    conversationItem: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.neutral[100],
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
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.neutral[900],
    },
    time: {
        fontSize: 12,
        color: colors.neutral[500],
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        fontSize: 14,
        color: colors.neutral[500],
        flex: 1,
        marginRight: 8,
    },
    unreadMessage: {
        color: colors.neutral[900],
        fontWeight: '600',
    },
    unreadBadge: {
        backgroundColor: colors.primary.DEFAULT,
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    unreadText: {
        color: colors.white,
        fontSize: 10,
        fontWeight: '800',
    },
    separator: {
        height: 1,
        backgroundColor: colors.neutral[50],
        marginLeft: 76,
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
