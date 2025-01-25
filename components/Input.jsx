import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, View, Animated, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../assets/colors/global';

/**
 * Componente de input de texto.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.type - Tipo de entrada (text, email, password, numeric).
 * @param {string} props.label - Texto do label.
 * @param {string} [props.value] - Valor do campo.
 * @param {Function} [props.onChangeText] - Função chamada ao alterar o texto.
 * @returns {JSX.Element} O componente de entrada de texto.
 */
const Input = ({ type = 'text', label, value, onChangeText, required = false, error = false, ...props }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(type === 'password');
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const togglePasswordVisibility = () => {
    setSecureTextEntry((prev) => !prev);
  };

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    top: labelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [24, required ? -4 : 0],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    })
  };

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      marginVertical: 8,
    },
    label: {
      position: 'absolute',
      left: 8,
      top: 24,
      color: error ? colors.scarlet : colors.hookers_green,
    },
    asterisco: {
      position: 'absolute',
      color: colors.scarlet,
      fontSize: 16,
      height: 8
    },
    input: {
      borderWidth: 1,
      borderColor: error ? colors.scarlet : colors.hookers_green,
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 8,
      fontSize: 16,
      color: error ? colors.scarlet : colors.hookers_green,
      marginTop: 16,
    },
    iconContainer: {
      position: 'absolute',
      right: 0,
      top: 16,
      padding: 8
    },
  });

  const keyboardType = {
    text: 'default',
    email: 'email-address',
    password: 'default',
    numeric: 'numeric',
  }[type] || 'default';

  const autoCapitalize = type === 'email' ? 'none' : 'words';
  const isPassword = type === 'password';

  const renderLabel = () => (
    <Animated.Text style={[styles.label, labelStyle]}>
      {label}
      {required && <Text style={styles.asterisco}>*</Text>}
    </Animated.Text>
  );

  return (
    <View style={styles.container}>
      {renderLabel()}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize={autoCapitalize}
        underlineColorAndroid="transparent"
        accessible={true} 
        accessibilityRole="text" 
        accessibilityLabel={`Campo ${label}`}
        accessibilityHint={type === 'password' ? "Pressione para ver a senha" : `Digite o texto de ${label} aqui`}
        {...props}
      />
      {isPassword && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          <MaterialIcons
            name={secureTextEntry ? 'visibility' : 'visibility-off'}
            size={20}
            color={colors.hookers_green}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};



export default Input;
