import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Screen from '../components/Screen'
import Button from '../components/Button';
import { colors } from '../assets/colors/global';
import logo from '../assets/images/image.png'
import Input from '../components/Input';
import { useAuth } from '../contexts/authContext'
import { useRouter } from 'expo-router';

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { onLogin } = useAuth();
    const router = useRouter();


    const handleLogin = () => {
        onLogin(username, password);
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
                justifyContent: 'flex-start',
            }}
        > 
            <View style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <Image source={logo} style={{ 
                    width: 87, 
                    height: 80, 
                    marginBottom: '10%',
                }} />

                <View 
                    style={{
                        width: '100%'
                    }}
                >
                    <Input
                        type="text"
                        label="Username"
                        error={false}
                        value={username}
                        onChangeText={(e) => setUsername(e)}
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
                        <Text style={styles.link}>Não tenho cadastro  </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Screen>
    )
}

export default Login
