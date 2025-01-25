import { Text } from 'react-native'
import React, { useEffect } from 'react'
import Screen from '../../components/Screen'

const Profile = () => {
    useEffect(() => {
        console.log("PROFILE AQUI")
    }, [])

    return (
        <Screen scroll>
            <Text>Profile</Text>
        </Screen>
    )
}

export default Profile
