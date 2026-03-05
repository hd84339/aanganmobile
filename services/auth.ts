export const authService = {
    // Adapted to match typical web service file patterns as requested
    // This serves as a placeholder pointing to the actual backend API routes
    googleLogin: async (token: string) => {
        // return fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/google`, {
        //  method: 'POST',
        //  headers: { 'Content-Type': 'application/json' },
        //  body: JSON.stringify({ token }),
        // }).then(res => res.json());
        console.log("Mock calling Google Login with token:", token);
        return { token: "mock_google_token", user: { email: "test@google.com" } };
    },

    register: async (data: any) => {
        console.log("Mock Registration", data);
        return { token: "mock_register_token" };
    },

    verifyEmail: async (code: string) => {
        console.log("Mock Verify", code);
        return { success: true };
    }
};
