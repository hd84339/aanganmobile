import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import GoogleAuthWrapper from '@/components/GoogleAuthWrapper';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/authStore';

export const unstable_settings = {
  anchor: '(auth)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { checkAuth, loading, token } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!loading) {
      if (token) {
        router.replace('/(app)/dashboard' as any);
      } else {
        router.replace('/(auth)/login' as any);
      }
    }
  }, [token, loading]);

  if (loading) {
    return null;
  }

  return (
    <GoogleAuthWrapper>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
    </GoogleAuthWrapper>
  );
}
