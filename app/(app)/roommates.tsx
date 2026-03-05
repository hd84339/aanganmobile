import { Card } from '@/components/ui/Card';
import { Loader } from '@/components/ui/Loader';
import { colors } from '@/utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const MOCK_ROOMMATES = [
    { id: '1', name: 'Rahul Sharma', age: 24, occupation: 'Software Engineer', budget: '₹12,000', location: 'Noida, Sec-62', image: 'https://i.pravatar.cc/150?u=rahul' },
    { id: '2', name: 'Priya Singh', age: 22, occupation: 'Student', budget: '₹8,000', location: 'Delhi, Mukherjee Nagar', image: 'https://i.pravatar.cc/150?u=priya' },
    { id: '3', name: 'Amit Verma', age: 26, occupation: 'Data Analyst', budget: '₹15,000', location: 'Gurgaon, DLF Ph-3', image: 'https://i.pravatar.cc/150?u=amit' },
    { id: '4', name: 'Sneha Kapur', age: 23, occupation: 'Designer', budget: '₹10,000', location: 'Noida, Sec-18', image: 'https://i.pravatar.cc/150?u=sneha' },
];

export default function RoommatesScreen() {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roommates, setRoommates] = useState(MOCK_ROOMMATES);

    useEffect(() => {
        // Simulate API fetch
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (text: string) => {
        setSearch(text);
        if (text.trim() === '') {
            setRoommates(MOCK_ROOMMATES);
        } else {
            const filtered = MOCK_ROOMMATES.filter(item =>
                item.name.toLowerCase().includes(text.toLowerCase()) ||
                item.location.toLowerCase().includes(text.toLowerCase())
            );
            setRoommates(filtered);
        }
    };

    const renderRoommate = ({ item }: { item: typeof MOCK_ROOMMATES[0] }) => (
        <TouchableOpacity
            style={styles.cardWrapper}
            onPress={() => router.push(`/(app)/user/${item.id}` as any)}
        >
            <Card style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <View style={styles.content}>
                    <Text style={styles.name}>{item.name}, {item.age}</Text>
                    <Text style={styles.occupation}>{item.occupation}</Text>
                    <View style={styles.locationRow}>
                        <MaterialCommunityIcons name="map-marker" size={14} color={colors.neutral[500]} />
                        <Text style={styles.location}>{item.location}</Text>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.budget}>{item.budget}</Text>
                        <TouchableOpacity style={styles.connectBtn}>
                            <MaterialCommunityIcons name="account-plus" size={20} color={colors.primary.DEFAULT} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>Find Roommates</Text>
                <Text style={styles.subtitle}>Connect with people who match your lifestyle</Text>
            </View>

            <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" size={20} color={colors.neutral[400]} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name or location..."
                    value={search}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity style={styles.filterBtn}>
                    <MaterialCommunityIcons name="tune-variant" size={20} color={colors.primary.DEFAULT} />
                </TouchableOpacity>
            </View>

            {loading ? (
                <Loader fullScreen={false} />
            ) : (
                <FlatList
                    data={roommates}
                    renderItem={renderRoommate}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <MaterialCommunityIcons name="account-search-outline" size={64} color={colors.neutral[300]} />
                            <Text style={styles.emptyText}>No roommates found matching your search.</Text>
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
        backgroundColor: '#ffffff',
    },
    header: {
        padding: 24,
        paddingBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.neutral[900],
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: colors.neutral[500],
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 24,
        marginBottom: 20,
        backgroundColor: colors.neutral[50],
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.neutral[200],
        paddingHorizontal: 16,
        height: 52,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 15,
        color: colors.neutral[900],
    },
    filterBtn: {
        padding: 4,
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    cardWrapper: {
        width: '48%',
        marginBottom: 16,
    },
    card: {
        padding: 0,
        overflow: 'hidden',
        height: 240,
    },
    avatar: {
        width: '100%',
        height: 120,
        backgroundColor: colors.neutral[100],
    },
    content: {
        padding: 12,
        flex: 1,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.neutral[900],
    },
    occupation: {
        fontSize: 12,
        color: colors.neutral[500],
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    location: {
        fontSize: 11,
        color: colors.neutral[600],
        marginLeft: 2,
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.neutral[100],
        paddingTop: 8,
    },
    budget: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.secondary.DEFAULT,
    },
    connectBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.primary[50],
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        marginTop: 80,
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
