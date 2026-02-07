import React from 'react'
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../assets/colors/global'

const Screen = ({ children, scroll = false, style = {} }) => {

    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: colors.mint_green,
            paddingTop: 16,
            paddingBottom: 16,
            height: "100%",
            ...style
        },
        scrollContent: {
            flexGrow: 1,
            paddingHorizontal: 16,
            ...style.scrollContent
        },
        view: {
            flex: 1,
            width: '100%',
            paddingHorizontal: 16,
        }
    })

    const content = scroll ? (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            {children}
        </ScrollView>
    ) : (
        <View style={styles.view}>
            {children}
        </View>
    )

    return (
        <SafeAreaView style={styles.screen}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 20}
            >
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    accessible={false}
                >
                    <View style={{ flex: 1 }}>
                        {content}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Screen
