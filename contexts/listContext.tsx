import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface ListProps {
    listState: {
        open: boolean | null; 
        id: number | null;
        name: string | null;
        created: string | null;
    };
    onOpen: (id: number, name: string, created: string) => void;
    onClose: () => void;
}

const ListContext = createContext<Partial<ListProps>>({});

export const useList = () => {
    return useContext(ListContext);
}

export const ListProvider = ({ children }: any) => {
    const [listState, setListState] = useState<{
        open: boolean | null;
        id: number | null;
        name: string | null;
        created: string | null;
    }>({
        open: null,
        id: null,
        name: null,
        created: null,
    });

    const saveListState = async (state: { 
        open: boolean; 
        id: number | null; 
        name: string | null; 
        created: string | null 
    }) => {
        try {
            await AsyncStorage.setItem("listState", JSON.stringify(state));
        } catch (error) {
            console.error("Erro ao salvar estado de autenticação:", error);
        }
    };

    const loadListState = async () => {
        try {
            const storedState = await AsyncStorage.getItem("listState");
            if (storedState) {
                setListState(JSON.parse(storedState));
            } else {
                setListState({ 
                    open: false, 
                    id: null, 
                    name: null, 
                    created: null 
                });
            }
        } catch (error) {
            console.error("Erro ao carregar estado de lista:", error);
            setListState({ 
                open: false, 
                id: null, 
                name: null, 
                created: null 
            });
        }
    };

    const clearAuthState = async () => {
        try {
            await AsyncStorage.removeItem("listState");
        } catch (error) {
            console.error("Erro ao limpar estado de lista:", error);
        }
    };

    const open = async (id: number, name: string, created: string) => {
            const newState = { open: true, id, name, created };
            setListState(newState);
            await saveListState(newState);

    }

    const close = async () => {
        setListState({ 
            open: false, 
            id: null, 
            name: null, 
            created: null 
        });
        await clearAuthState();
    }

    useEffect(() => {
        loadListState();
    }, []);

    const value = {
        onOpen: open,
        onClose: close,
        listState
    }

    return <ListContext.Provider value={value}>{children}</ListContext.Provider>
}
