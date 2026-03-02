import React, { useEffect } from "react"
import { Tabs, useRouter, useSegments } from "expo-router"

import { AuthProvider, useAuth } from "../contexts/authContext"
import { ListProvider } from "../contexts/listContext"
import { GpsProvider } from '../contexts/gpsContext'

const TabsLayout = () => {
    const { authState } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] === '(protected)'

        if (!authState?.authenticated && inAuthGroup) {
            router.replace('/')
        } else if (authState?.authenticated === true) {
            router.replace('/(protected)/home')
        }
    }, [authState])

    return (
        <Tabs
            tabBar={() => <></>}
            screenOptions={{
                headerShown: false
            }}
        > 
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Login"
                }}
            />

            <Tabs.Screen 
                name="subscribe"
                options={{
                    title: "Cadastro"
                }}
            />
        </Tabs>
    )
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <GpsProvider>
                <ListProvider>
                    <TabsLayout />
                </ListProvider>
            </GpsProvider>
        </AuthProvider>
    )
}
