import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../utils/colors';

interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    onPress,
    title,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    style,
    textStyle,
    icon,
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'secondary':
                return { backgroundColor: colors.secondary.DEFAULT, borderColor: colors.secondary.DEFAULT };
            case 'outline':
                return { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary.DEFAULT };
            case 'ghost':
                return { backgroundColor: 'transparent' };
            case 'danger':
                return { backgroundColor: colors.error, borderColor: colors.error };
            default:
                return { backgroundColor: colors.primary.DEFAULT, borderColor: colors.primary.DEFAULT };
        }
    };

    const getTextStyles = () => {
        if (variant === 'outline' || variant === 'ghost') {
            return { color: colors.primary.DEFAULT };
        }
        return { color: colors.white };
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 };
            case 'lg':
                return { paddingVertical: 16, paddingHorizontal: 24, borderRadius: 14 };
            default:
                return { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 };
        }
    };

    const getFontSize = () => {
        switch (size) {
            case 'sm':
                return { fontSize: 14 };
            case 'lg':
                return { fontSize: 18 };
            default:
                return { fontSize: 16 };
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.base,
                getVariantStyles(),
                getSizeStyles(),
                disabled && styles.disabled,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? colors.primary.DEFAULT : colors.white} />
            ) : (
                <>
                    {icon}
                    <Text style={[styles.text, getTextStyles(), getFontSize(), textStyle]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: '700',
        textAlign: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
});
