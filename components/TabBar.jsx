import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useLinkBuilder } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { colors } from '../assets/colors/global';

const TabBar = ({ state, descriptors, navigation }) => {
    const { buildHref } = useLinkBuilder();
    const hideTabBarList = [
        'createList',
        'createProduct',
        'editProduct',
        'cameraSearch',
    ]
    const hideMenu = [
        '_sitemap', 
        '+not-found', 
        'subscribe', 
        'createList', 
        'list', 
        'createProduct',
        'editProduct',
        'cameraSearch',
    ];
    const routeName = state.routes[state.index].name;

    if (hideTabBarList.includes(routeName)) {
        return
    }

    const icons = {
        home: <FontAwesome6 name="list-check" size={24} color={`${colors.white}`} />,
        search: <FontAwesome5 name="search" size={24} color={`${colors.white}`} />,
        camera: <FontAwesome6 name="camera" size={24} color={`${colors.white}`} />,
        profile: <FontAwesome name="user" size={24} color={`${colors.white}`} />,
    }

    return (
        <View style={styles.tabbarArea}>
            <View style={styles.tabbar}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;
    
                    if(hideMenu.includes(route.name)) return null;
    
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
                                backgroundColor: isFocused ? colors.turquoise : "transparent"
                            }}
                        >
                            {icons[`${route.name}`]}
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
        bottom: 68,
        width: '100%'
    },
    tabbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.hookers_green_opacity,
        color: colors.white,
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