import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, getColorKeyByValue } from '../assets/colors/global';

/**
 * Button
 *
 * @param {Object} props - As propriedades do botão.
 * @param {string} props.backgroundColor - Cor de fundo do botão (obrigatória).
 * @param {string} props.text - Texto exibido no botão (obrigatória).
 * @param {string} props.accessibilityHint - Texto de acessibilidade do botão (obrigatória).
 * @param {'edit' | 'add' | 'success' | 'delete' | 'error'} [props.type] - Tipo de botão, determina o ícone exibido (opcional).
 * @param {boolean} [props.outline=false] - Define se o botão terá um estilo transparente (opcional).
 * @param {boolean} [props.uppercase=true] - Define se o texto será em caixa alta (opcional).
 * @param {string | number} [props.width] - Largura customizada do botão (opcional).
 * @returns {JSX.Element} O componente de botão.
 */
const Button = (props) => {

    const styles = StyleSheet.create({
        button: {
            width: props.width ? props.width : 256,
            height: 36,
            margin: props.margin ? props.margin : 0,
            marginTop: props.marginTop ? props.marginTop : 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.outline ? "transparent" : props.backgroundColor,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: props.backgroundColor,
            borderRadius: 4,
            paddingVertical: props.text === '' ? 0 : 8,
            paddingHorizontal: props.text === '' ? 0 : 16,
            gap: props.text === '' ? 0 : 8,
        },
        text: {
            color: props.outline ? props.backgroundColor : colors.font.to_background[getColorKeyByValue(props.backgroundColor)],
            textTransform: props.uppercase === false ? 'none' : 'uppercase',
        }
    });

    const icons = {
        edit: <Entypo name="edit" size={16} color={`${styles.text.color}`} />,
        add: <AntDesign name="plus" size={16} color={`${styles.text.color}`} />,
        success: <Feather name="check" size={16} color={`${styles.text.color}`} />,
        delete: <MaterialIcons name="delete" size={16} color={`${styles.text.color}`} />,
        error: <AntDesign name="close" size={16} color={`${styles.text.color}`} />,
    }

    return (
        <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.9} 
            accessible={true}
            accessibilityLabel={props.text ? `Botão ${props.text}` : props.accessibilityLabel}
            accessibilityHint={props.accessibilityHint}
            onPress={props.onPress}
            {...props}
        >
            {props.type && (
                <>{icons[props.type]}</>
            )}

            {props.text && <Text style={styles.text}>{props.text}</Text>}
        </TouchableOpacity>
    )
}

export default Button
