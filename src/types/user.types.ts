export interface User {
    id: string;
    name: string;
    username?: string;
    email: string;
    displayName?: string;
    avatarUrl?: string;
    isPremium?: boolean;
    role: "user" | "artist" | "admin";
    createdAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    role?: string;
}
