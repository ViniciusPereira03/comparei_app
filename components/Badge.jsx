import { StyleSheet, Text, View } from "react-native";
import { colors, getColorKeyByValue } from "../assets/colors/global";

const Badge = ({text, outline,backgroundColor }) => {

    const styled = StyleSheet.create({
        badge: {
            width: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: outline ? "transparent" : backgroundColor,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: backgroundColor,
            borderRadius: 4,
            paddingVertical: 2,
            paddingHorizontal: 2,
        },
        text: {
            color: outline ? backgroundColor : colors.font.to_background[getColorKeyByValue(backgroundColor)],

        }
    })

    return (
        <View style={styled.badge}>
            <Text style={styled.text}>{text}</Text>
        </View>
    )
}

export default Badge;
