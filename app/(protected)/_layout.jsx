import { Tabs } from "expo-router"
import TabBar from "../../components/TabBar"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const TabsLayout = () => {
    return(
        <GestureHandlerRootView>
            <Tabs
                tabBar={props => <TabBar {...props} />}
                screenOptions={{
                    headerShown: false
                }}
            > 
                <Tabs.Screen 
                    name="home"
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
            </Tabs>
        </GestureHandlerRootView>
    )
}

export default TabsLayout