import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../../utils/colors';

interface LoaderProps {
    size?: 'small' | 'large';
    color?: string;
    fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
    size = 'large',
    color = colors.primary.DEFAULT,
    fullScreen = false
}) => {
    if (fullScreen) {
        return (
            <View style={styles.fullScreen}>
                <ActivityIndicator size={size} color={color} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
