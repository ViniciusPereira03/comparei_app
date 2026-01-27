import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../services/users/user";
import { tokenStore } from "../services/tokenStore";

type AuthState = {
    authenticated: boolean | null;
    username: string | null;
    token: string | null;
    id: string | null;
};

interface AuthProps {
    authState: AuthState;
    loading: boolean;
    onLogin: (username: string, password: string) => void;
    onLogout: () => void;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<AuthState>({
        authenticated: null,
        username: null,
        token: null,
        id: null,
    });

    /**
     * Controla se o estado já foi reidratado do storage
     */
    const [loading, setLoading] = useState<boolean>(true);

    const saveAuthState = async (state: { authenticated: boolean; username: string | null }) => {
        try {
            await AsyncStorage.setItem("authState", JSON.stringify(state));
        } catch (error) {
            console.error("Erro ao salvar estado de autenticação:", error);
        }
    };

    const loadAuthState = async () => {
        try {
            const storedState = await AsyncStorage.getItem("authState");
            if (storedState) {
                const parsedState: AuthState = JSON.parse(storedState);

                setAuthState(parsedState);

                // 🔑 Mantém o token atualizado no apiClient
                if (parsedState.token) {
                    tokenStore.setToken(parsedState.token);
                }
            } else {
                setAuthState({
                    authenticated: false,
                    username: null,
                    token: null,
                    id: null,
                });
            }
        } catch (error) {
            console.error("Erro ao carregar estado de autenticação:", error);
            setAuthState({
                authenticated: false,
                username: null,
                token: null,
                id: null,
            });
        } finally {
            setLoading(false);
        }
    };

    const clearAuthState = async () => {
        try {
            await AsyncStorage.removeItem("authState");
        } catch (error) {
            console.error("Erro ao limpar estado de autenticação:", error);
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const response = await loginUser(username, password);

            const newState = {
                authenticated: true,
                username,
                id: response.id,
                token: response.token,
            };

            tokenStore.setToken(newState.token);
            setAuthState(newState);
            await saveAuthState(newState);
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            throw error;
        }
    };

    const logout = async () => {
        tokenStore.setToken(null);
        setAuthState({
            authenticated: false,
            username: null,
            token: null,
            id: null,
        });
        await clearAuthState();
    }

    useEffect(() => {
        loadAuthState();
    }, []);

    const value: AuthProps = {
        authState,
        loading,
        onLogin: login,
        onLogout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
