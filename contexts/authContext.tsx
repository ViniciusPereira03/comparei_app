import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface AuthProps {
    authState: {authenticated: boolean | null; username: string | null};
    onLogin: (username: string, password: string) => void;
    onLogout: () => void;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        authenticated: boolean | null;
        username: string | null;
    }>({
        authenticated: null,
        username: null
    });

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
                setAuthState(JSON.parse(storedState));
            } else {
                setAuthState({ authenticated: false, username: null });
            }
        } catch (error) {
            console.error("Erro ao carregar estado de autenticação:", error);
            setAuthState({ authenticated: false, username: null });
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
        if (username === 'admin' && password === 'admin') {
            const newState = { authenticated: true, username: username };
            setAuthState(newState);
            await saveAuthState(newState);
        } else {
            alert("Invalid username or password")
        }
    }

    const logout = async () => {
        setAuthState({ authenticated: false, username: null });
        await clearAuthState();
    }

    useEffect(() => {
        loadAuthState();
    }, []);

    const value = {
        onLogin: login,
        onLogout: logout,
        authState
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
