import React, { createContext, useContext, useState, useEffect } from "react";


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

    const login = (username: string, password: string) => {
        if (username === 'admin' && password === 'admin') {
            setAuthState({
                authenticated: true,
                username: username
            })
        } else {
            alert("Invalid username or password")
        }
    }

    const logout = async () => {
        setAuthState({
            authenticated: false,
            username: null
        })
    }

    const value = {
        onLogin: login,
        onLogout: logout,
        authState
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
