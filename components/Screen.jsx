import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Screen = (props) => {
    return (
        <SafeAreaView>
            <ScrollView>
                {props.children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Screen