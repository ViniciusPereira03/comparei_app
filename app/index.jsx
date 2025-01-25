import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Screen from '../components/Screen'
import Button from '../components/Button';
import { colors } from '../assets/colors/global';
import logo from '../assets/images/image.png'
import Input from '../components/Input';
import { useAuth } from '../contexts/authContext'
import { useRouter } from 'expo-router';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { onLogin } = useAuth();
    const router = useRouter();


    const handleLogin = () => {
        onLogin(email, password);
    }

    const redirectToSubscribe = () => {
        router.replace('/subscribe')
    }

    const styles = StyleSheet.create({
        link: {
            color: colors.font.to_background.mint_green,
            margin: 'auto',
            marginTop: 16,
        }
    })

    return (
        <Screen
            style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Image source={logo} style={{ width: 87, height: 80, margin: 'auto'}} />

            <Input
                type="email"
                label="E-mail"
                error={false}
                value={email}
                onChangeText={(e) => setEmail(e)}
            />

            <Input
                type="password"
                label="Senha"
                value={password}
                onChangeText={(e) => setPassword(e)}
            />

            <Button 
                width="100%"
                backgroundColor={colors.turquoise}
                text="Entrar"
                accessibilityHint="Pressione para fazer login!"
                type=""
                onPress={() => handleLogin()}
            />

            <TouchableOpacity onPress={() => redirectToSubscribe()}>
                <Text style={styles.link}>Não tenho cadastro</Text>
            </TouchableOpacity>
        </Screen>
    )
}

export default Login
