import { Text } from 'react-native'
import React, { useEffect } from 'react'
import Screen from '../../components/Screen'

const Search = () => {
    useEffect(() => {
        console.log("SEARCH AQUI")
    }, [])
    return (
        <Screen scroll>
            <Text>Search</Text>
        </Screen>
    )
}

export default Search
