import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../assets/colors/global';
import Ionicons from '@expo/vector-icons/Ionicons';

const BackButton = (props) => {

    const styles = StyleSheet.create({
        button: {
            padding: 8
        }
    });

    return (
        <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.9} 
            accessible={true}
            accessibilityLabel={`Botão para voltar`}
            accessibilityHint={props.accessibilityHint}
            {...props}
        >
            <Ionicons name="chevron-back-outline" size={24} color={colors.hookers_green} />
        </TouchableOpacity>
    )
}

export default BackButton
