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
                    name="search"
                    options={{
                        title: "Search"
                    }}
                />
                
                <Tabs.Screen 
                    name="camera"
                    options={{
                        title: "Camera"
                    }}
                />

                <Tabs.Screen 
                    name="profile"
                    options={{
                        title: "Profile"
                    }}
                />
                
                <Tabs.Screen 
                    name="createList"
                    options={{
                        title: "Criar nova lista"
                    }}
                />
                
                <Tabs.Screen 
                    name="list"
                    options={{
                        title: "Lista de compras"
                    }}
                />
                
                <Tabs.Screen 
                    name="createProduct"
                    options={{
                        title: "Criar novo produto"
                    }}
                />

                                
                <Tabs.Screen 
                    name="editProduct"
                    options={{
                        title: "Editar produto"
                    }}
                />
            </Tabs>
        </GestureHandlerRootView>
    )
}

export default TabsLayout