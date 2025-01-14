import React from "react"
import { Tabs } from "expo-router"
import TabBar from "../components/TabBar"

const _layout = () => {

    return (
        <Tabs
            tabBar={props => <TabBar {...props} />}
            screenOptions={{
                headerShown: false
            }}
        > 
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Home"
                }}
            />
            <Tabs.Screen 
                name="camera"
                options={{
                    title: "Camera"
                }}
            />
            <Tabs.Screen 
                name="search"
                options={{
                    title: "Search"
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title: "Profile"
                }}
            />
            <Tabs.Screen 
                name="subscribe"
                options={{
                    title: "Subscribe"
                }}
            />
            <Tabs.Screen 
                name="login"
                options={{
                    title: "Login"
                }}
            />
        </Tabs>
    )
}

export default _layout