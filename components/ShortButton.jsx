import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { colors, getColorKeyByValue } from '../assets/colors/global';

const ShortButton = (props) => {

    const styles = StyleSheet.create({
        button: {
            width: 52,
            height: 52,
            marginTop: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.outline ? "transparent" : props.backgroundColor,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: props.backgroundColor,
            borderRadius: 100,
            paddingVertical: 8,
            paddingHorizontal: 8,

        },
        text: {
            color: props.outline ? props.backgroundColor : colors.font.to_background[getColorKeyByValue(props.backgroundColor)],
        }
    });

    const icons = {

        done: <Feather name="check" size={32} color={`${styles.text.color}`} />,
        next: <AntDesign name="arrowright" size={32} color={`${styles.text.color}`} />,
    }

    return (
        <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.9} 
            accessible={true}
            accessibilityLabel={`Botão ${props.text}`}
            accessibilityHint={props.accessibilityHint}
            {...props}
        >
            {props.type && (
                <>{icons[props.type]}</>
            )}
        </TouchableOpacity>
    )
}

export default ShortButton
