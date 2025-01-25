import { Text } from 'react-native'
import React, { useEffect } from 'react'
import Screen from '../../components/Screen'

const Camera = () => {

    useEffect(() => {
        console.log("CAMERA AQUI")
    }, [])

    return (
        <Screen scroll>
            <Text>Camera</Text>
        </Screen>
    )
}

export default Camera
