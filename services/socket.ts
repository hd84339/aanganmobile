import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || 'https://aangan-2o34.onrender.com';

export const socketService = {
    socket: null as any,

    connect: async () => {
        const token = await AsyncStorage.getItem('auth_token');
        socketService.socket = io(SOCKET_URL, {
            auth: { token },
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
        });
        return socketService.socket;
    },

    disconnect: () => {
        if (socketService.socket) {
            socketService.socket.disconnect();
        }
    },

    joinConversation: (conversationId: string) => {
        socketService.socket?.emit('join_conversation', { conversationId });
    },

    joinUserRoom: (userId: string) => {
        socketService.socket?.emit('join_user_room', { userId });
    },

    sendMessage: (conversationId: string, content: string) => {
        socketService.socket?.emit('send_message', { conversationId, content });
    },

    onMessage: (callback: (data: any) => void) => {
        socketService.socket?.on('receive_message', callback);
    },

    onNotification: (callback: (data: any) => void) => {
        socketService.socket?.on('notification', callback);
    },
};
