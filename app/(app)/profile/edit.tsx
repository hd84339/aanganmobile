import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/utils/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
    const { user } = useAuthStore();
    const [name, setName] = useState(user?.name || '');
    const [bio, setBio] = useState('Looking for a chill roommate who respects privacy...');
    const [budget, setBudget] = useState('12000');
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Profile updated successfully!');
            router.back();
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialCommunityIcons name="close" size={28} color={colors.neutral[900]} />
                </TouchableOpacity>
                <Text style={styles.title}>Edit Profile</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text style={styles.saveBtn}>Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.avatarSection}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?u=' + user?._id }}
                        style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.changePhotoBtn}>
                        <MaterialCommunityIcons name="camera" size={20} color={colors.white} />
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>Full Name</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Your name"
                        />
                    </View>

                    <Text style={styles.label}>Bio</Text>
                    <View style={[styles.inputWrapper, { height: 120, alignItems: 'flex-start', paddingVertical: 12 }]}>
                        <TextInput
                            style={[styles.input, { height: '100%' }]}
                            value={bio}
                            onChangeText={setBio}
                            placeholder="Tell us about yourself..."
                            multiline
                            textAlignVertical="top"
                        />
                    </View>

                    <Text style={styles.label}>Monthly Budget (₹)</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            value={budget}
                            onChangeText={setBudget}
                            placeholder="e.g. 10000"
                            keyboardType="number-pad"
                        />
                    </View>
                </View>

                <Card style={styles.infoCard}>
                    <MaterialCommunityIcons name="information-outline" size={20} color={colors.primary.DEFAULT} />
                    <Text style={styles.infoText}>
                        Changes to your profile will be visible to potential roommates and in your listings.
                    </Text>
                </Card>
            </ScrollView>
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
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral[100],
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.neutral[900],
    },
    saveBtn: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.primary.DEFAULT,
    },
    container: {
        padding: 24,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.neutral[100],
    },
    changePhotoBtn: {
        position: 'absolute',
        bottom: 0,
        right: '35%',
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.primary.DEFAULT,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.white,
    },
    form: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.neutral[700],
        marginBottom: 8,
        marginLeft: 4,
    },
    inputWrapper: {
        backgroundColor: colors.neutral[50],
        borderWidth: 1,
        borderColor: colors.neutral[200],
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        fontSize: 16,
        color: colors.neutral[900],
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: colors.primary[50],
        borderColor: 'transparent',
        padding: 16,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: colors.primary[700],
        marginLeft: 12,
        lineHeight: 18,
    },
});
