// Bypassed Supabase Client for Local Development without Auth
const MOCK_ADMIN_USER = {
    id: 'local-admin-id',
    email: 'admin@localhost',
    user_metadata: {
        full_name: 'Local Admin (Bypassed)',
    },
    app_metadata: {
        provider: 'local',
        role: 'admin',
    },
    last_sign_in_at: new Date().toISOString(),
};

const MOCK_ADMIN_SESSION = {
    access_token: 'mock-local-admin-token',
    token_type: 'bearer',
    expires_in: 360000,
    refresh_token: 'mock-refresh-token',
    user: MOCK_ADMIN_USER,
};

export const supabase = {
    auth: {
        getSession: async () => ({
            data: { session: MOCK_ADMIN_SESSION },
            error: null,
        }),
        getUser: async () => ({
            data: { user: MOCK_ADMIN_USER },
            error: null,
        }),
        onAuthStateChange: (callback) => {
            setTimeout(() => callback('SIGNED_IN', MOCK_ADMIN_SESSION), 0);
            return {
                data: {
                    subscription: {
                        unsubscribe: () => {},
                    },
                },
            };
        },
        signInWithPassword: async () => ({
            data: { session: MOCK_ADMIN_SESSION, user: MOCK_ADMIN_USER },
            error: null,
        }),
        signInWithOAuth: async () => ({
            data: { session: MOCK_ADMIN_SESSION, user: MOCK_ADMIN_USER },
            error: null,
        }),
        signUp: async () => ({
            data: { session: MOCK_ADMIN_SESSION, user: MOCK_ADMIN_USER },
            error: null,
        }),
        signOut: async () => ({ error: null }),
        updateUser: async (updates) => ({
            data: { user: { ...MOCK_ADMIN_USER, ...updates } },
            error: null,
        }),
    },
    rpc: async () => ({ data: null, error: null }),
};

