import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const TabBar = ({ state, descriptors, navigation }) => {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    const icons = {
        index: <FontAwesome6 name="list-check" size={24} color="white" />,
        search: <FontAwesome5 name="search" size={24} color="white" />,
        camera: <FontAwesome6 name="camera" size={24} color="white" />,
        profile: <FontAwesome name="user" size={24} color="white" />,
    }

    return (
        <View style={styles.tabbarArea}>
            <View style={styles.tabbar}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;
    
                    if(['_sitemap', '+not-found'].includes(route.name)) return null;
    
                    const isFocused = state.index === index;
    
                    const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
    
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                    };
    
                    const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                    };
    
                    return (
                    <TouchableOpacity
                        key={route.name}
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            ...styles.tabbarItem,
                            backgroundColor: isFocused ? "#78D5B3" : "transparent"
                        }}
                    >
                        {icons[route.name]}

                        {/* <Text style={{ color: isFocused ? colors.primary : colors.text }}>
                        {route.name}
                        </Text> */}
                    </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tabbarArea: {
        position: 'absolute',
        bottom: 34,
        width: '100%'
    },
    tabbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#3c6b5ae6",
        color: "#FFF",
        width: 234,
        height: 68,
        borderRadius: 50,
        borderCurve: 'continuous',
        margin: 'auto',
        paddingHorizontal: 10
    },
    tabbarItem: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        width: 52,
        height: 52,
        borderRadius: 100,
    }
})

export default TabBar