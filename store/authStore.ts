import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

interface User {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    username?: string;
    isVerified: boolean;
    profile?: any;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    loading: true,

    login: async (token) => {
        await AsyncStorage.setItem('auth_token', token);
        const decoded: any = jwtDecode(token);
        set({ user: decoded, token });
    },

    logout: async () => {
        await AsyncStorage.removeItem('auth_token');
        set({ user: null, token: null });
    },

    checkAuth: async () => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            if (token) {
                const decoded: any = jwtDecode(token);
                set({ user: decoded, token });
            }
        } catch (err) {
            console.error('Auth check failed:', err);
        } finally {
            set({ loading: false });
        }
    },
}));
