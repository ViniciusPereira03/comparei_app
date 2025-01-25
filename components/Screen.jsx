import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../assets/colors/global'

const Screen = (props) => {

    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: colors.mint_green,
            paddingTop: 16,
            paddingBottom: 16,
            ...props.style
        },
        scroll: {
            width: '100%',
            paddingHorizontal: 16,
        },
        view: {
            width: '100%',
            height: 'auto',
            paddingHorizontal: 16,
        }
    })

    return (
        <SafeAreaView style={styles.screen}>
            {props.scroll ? (
                <ScrollView style={styles.scroll}>
                    {props.children}
                </ScrollView>
            ) : (
                <View style={styles.view}> 
                    {props.children} 
                </View>
            )}
        </SafeAreaView>
    )
}

export default Screen