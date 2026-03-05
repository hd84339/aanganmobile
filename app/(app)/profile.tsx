import { useAuthStore } from '@/store/authStore';
import { colors } from '@/utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const { user, logout } = useAuthStore();

    const MENU_ITEMS = [
        { id: '1', title: 'Edit Profile', icon: 'account-edit-outline', action: () => router.push('/(app)/profile/edit') },
        { id: '2', title: 'My Listings', icon: 'home-city-outline', action: () => { } },
        { id: '3', title: 'Identity Verification', icon: 'shield-check-outline', action: () => { }, badge: 'Pending' },
        { id: '4', title: 'Preferences', icon: 'tune-vertical', action: () => { } },
        { id: '5', title: 'Notifications', icon: 'bell-outline', action: () => { }, toggle: true },
        { id: '6', title: 'Help & Support', icon: 'help-circle-outline', action: () => { } },
        { id: '7', title: 'Privacy Policy', icon: 'file-document-outline', action: () => { } },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.profileCard}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?u=' + user?._id }}
                        style={styles.avatar}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>{user?.name || 'User Name'}</Text>
                        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
                        <TouchableOpacity style={styles.viewProfileBtn} onPress={() => router.push(`/(app)/user/${user?._id}` as any)}>
                            <Text style={styles.viewProfileText}>View Public Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    {MENU_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            onPress={item.action}
                            disabled={!!item.toggle}
                        >
                            <View style={styles.menuIconContainer}>
                                <MaterialCommunityIcons name={item.icon as any} size={22} color={colors.neutral[700]} />
                            </View>
                            <Text style={styles.menuTitle}>{item.title}</Text>

                            {item.badge && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{item.badge}</Text>
                                </View>
                            )}

                            {item.toggle ? (
                                <Switch
                                    value={true}
                                    onValueChange={() => { }}
                                    trackColor={{ false: colors.neutral[200], true: colors.primary[200] }}
                                    thumbColor={true ? colors.primary.DEFAULT : colors.neutral[400]}
                                />
                            ) : (
                                <MaterialCommunityIcons name="chevron-right" size={24} color={colors.neutral[300]} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <MaterialCommunityIcons name="logout" size={22} color={colors.error} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Aangan v1.0.0</Text>
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
        paddingBottom: 40,
    },
    profileCard: {
        flexDirection: 'row',
        padding: 24,
        alignItems: 'center',
        backgroundColor: colors.neutral[50],
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral[100],
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.neutral[200],
    },
    profileInfo: {
        marginLeft: 20,
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.neutral[900],
    },
    email: {
        fontSize: 14,
        color: colors.neutral[500],
        marginTop: 2,
    },
    viewProfileBtn: {
        marginTop: 8,
    },
    viewProfileText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.primary.DEFAULT,
    },
    menuContainer: {
        paddingTop: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral[50],
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: colors.neutral[50],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: colors.neutral[800],
    },
    badge: {
        backgroundColor: colors.warning + '20',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 8,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.warning,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        paddingVertical: 16,
        marginHorizontal: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.error + '30',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.error,
        marginLeft: 8,
    },
    versionText: {
        textAlign: 'center',
        fontSize: 12,
        color: colors.neutral[400],
        marginTop: 24,
    },
});
