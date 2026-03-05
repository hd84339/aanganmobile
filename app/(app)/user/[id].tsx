import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Loader } from '@/components/ui/Loader';
import { colors } from '@/utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserProfileScreen() {
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Simulate API fetch for the specific user
        const timer = setTimeout(() => {
            setUser({
                id,
                name: id === '1' ? 'Rahul Sharma' : 'User profile',
                age: 24,
                occupation: 'Software Engineer',
                budget: '₹12,000/month',
                location: 'Noida, Sector-62',
                bio: 'Looking for a chill roommate who respects privacy and keeps the common areas clean. I work from home 3 days a week.',
                preferences: ['Non-smoker', 'Vegetarian preferred', 'Working Professional'],
                contact: {
                    phone: '+91 9876543210',
                    email: 'rahul.s@example.com'
                },
                image: 'https://i.pravatar.cc/300?u=' + id
            });
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [id]);

    const onShare = async () => {
        try {
            await Share.share({
                message: `Check out Rahul's profile on Aangan - find your perfect roommate!`,
            });
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) return <Loader fullScreen />;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareBtn} onPress={onShare}>
                        <MaterialCommunityIcons name="share-variant" size={22} color={colors.white} />
                    </TouchableOpacity>
                    <Image source={{ uri: user.image }} style={styles.coverImage} />
                </View>

                <View style={styles.profileSection}>
                    <View style={styles.nameRow}>
                        <View>
                            <Text style={styles.name}>{user.name}, {user.age}</Text>
                            <Text style={styles.occupation}>{user.occupation}</Text>
                        </View>
                        <View style={styles.verifiedBadge}>
                            <MaterialCommunityIcons name="check-decagram" size={24} color={colors.primary.DEFAULT} />
                        </View>
                    </View>

                    <View style={styles.infoGrid}>
                        <View style={styles.infoItem}>
                            <MaterialCommunityIcons name="wallet-outline" size={20} color={colors.primary.DEFAULT} />
                            <Text style={styles.infoLabel}>Budget</Text>
                            <Text style={styles.infoValue}>{user.budget}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <MaterialCommunityIcons name="map-marker-outline" size={20} color={colors.primary.DEFAULT} />
                            <Text style={styles.infoLabel}>Location</Text>
                            <Text style={styles.infoValue}>{user.location}</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>About Me</Text>
                    <Text style={styles.bio}>{user.bio}</Text>

                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <View style={styles.chipContainer}>
                        {user.preferences.map((pref: string, index: number) => (
                            <View key={index} style={styles.chip}>
                                <Text style={styles.chipText}>{pref}</Text>
                            </View>
                        ))}
                    </View>

                    <Card style={styles.contactCard}>
                        <Text style={styles.contactTitle}>Interested in connecting?</Text>
                        <View style={styles.btnRow}>
                            <Button
                                title="Message"
                                onPress={() => router.push(`/(app)/messages?userId=${user.id}` as any)}
                                icon={<MaterialCommunityIcons name="chat-processing-outline" size={20} color={colors.white} style={{ marginRight: 8 }} />}
                                style={{ flex: 1, marginRight: 12 }}
                            />
                            <TouchableOpacity style={styles.favoriteBtn}>
                                <MaterialCommunityIcons name="heart-outline" size={24} color={colors.error} />
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>
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
    header: {
        height: 300,
        position: 'relative',
    },
    coverImage: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.neutral[200],
    },
    backBtn: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileSection: {
        padding: 24,
        marginTop: -30,
        backgroundColor: colors.white,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    name: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.neutral[900],
    },
    occupation: {
        fontSize: 16,
        color: colors.neutral[500],
        marginTop: 2,
    },
    verifiedBadge: {
        paddingtop: 4,
    },
    infoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
        backgroundColor: colors.neutral[50],
        borderRadius: 20,
        padding: 16,
    },
    infoItem: {
        width: '45%',
    },
    infoLabel: {
        fontSize: 12,
        color: colors.neutral[500],
        marginTop: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.neutral[800],
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.neutral[900],
        marginBottom: 12,
    },
    bio: {
        fontSize: 15,
        lineHeight: 24,
        color: colors.neutral[600],
        marginBottom: 32,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 32,
    },
    chip: {
        backgroundColor: colors.secondary[50],
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: colors.secondary[100],
    },
    chipText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.secondary[700],
    },
    contactCard: {
        marginTop: 8,
        padding: 24,
        backgroundColor: colors.neutral[50],
        borderWidth: 0,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.neutral[900],
        marginBottom: 16,
        textAlign: 'center',
    },
    btnRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    favoriteBtn: {
        width: 56,
        height: 56,
        borderRadius: 12,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.neutral[200],
        justifyContent: 'center',
        alignItems: 'center',
    },
});
