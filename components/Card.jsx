import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../assets/colors/global'

const Card = ({props, children, direction}) => {
    const styles = StyleSheet.create({
        card: {
            margin: 8,
            backgroundColor: colors.white,
            borderRadius: 4,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 1,
            elevation: 4,
            padding: 8,
            flexDirection: direction ? direction : 'column'
        }
    })

    return (
        <View style={styles.card} {...props}>
            {children}
        </View>
    )
}

export default Card
