import { Image, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../components/Screen'
import ShortButton from '../components/ShortButton'
import { colors } from '../assets/colors/global'
import BackButton from '../components/BackButton'
import { router } from 'expo-router'
import logo from '../assets/images/image.png'
import Input from '../components/Input'
import { useAuth } from '../contexts/authContext'

const Subscribe = () => {
    const { onLogin } = useAuth();

    const [step, setStep] = useState(0)
    const [name, setName] = useState('');
    const [erroName, setErroName] = useState(false)
    const [username, setUsername] = useState('');
    const [erroUsername, setErroUsername] = useState(false)
    const [email, setEmail] = useState('');
    const [erroEmail, setErroEmail] = useState(false)
    const [password, setPassword] = useState('');
    const [erroPassword, setErroPassword] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState('');
    const [erroRepeatPassword, setErroRepeatPassword] = useState(false)

    //validar campos do primeiro passo
    const validaStep0 = () => {
        setErroName(name === "")
        setErroUsername(username === "")
        if (name === "" || username === "") {
            setStep(0)
        }
    }

    //validar campos do segundo passo
    const validaStep1 = () => {
        setErroEmail(email === "")
        if (email === "") {
            setStep(1)
        }
    }

    //validar campos do terceiro passo
    const validaStep2 = () => {
        setErroPassword(password === "")
        setErroRepeatPassword(repeatPassword === "")
        if (password === "" || repeatPassword === "") {
            setStep(2)
        } else if (password !== repeatPassword) {
            setErroPassword(true)
            setErroRepeatPassword(true)
            setStep(2)
        } else {
            console.log("SENHAS OK")
            subscribeAndLogin()
        }
    }

    // Realizar o cadastro e logar usuário
    const subscribeAndLogin = async () => {
        onLogin('admin', 'admin')
    }

    useEffect(() => {
        switch (step) {
            case 1:
                validaStep0()
                break;
        
            case 2:
                validaStep1()
                break;
        
            case 3:
                validaStep2()
                break;
        
            default:
                break;
        }
    }, [step])

    return (
        <Screen>
            <View style={{
                height: '100%',
                justifyContent: 'space-between'
            }}>

                <View>
                    <BackButton 
                        accessibilityHint="Pressione para voltar"
                        onPress={() => {
                            setStep(0)
                            router.back()
                        }}
                    />

                    <View style={{marginTop: "30%"}}>
                        <Image source={logo} style={{ width: 87, height: 80, margin: 'auto'}} />
                        
                        {step === 0 ? (
                            <>
                                <Input
                                    type="text"
                                    label="Seu nome"
                                    required={true}
                                    error={erroName}
                                    value={name}
                                    onChangeText={(e) => {
                                        setName(e)
                                        setErroName(false)
                                    }}
                                />
                                
                                <Input
                                    type="text"
                                    label="Escolha um nome de usuário"
                                    required={true}
                                    error={erroUsername}
                                    value={username}
                                    onChangeText={(e) => {
                                        setUsername(e)
                                        setErroUsername(false)
                                    }}
                                />
                            </>
                        ) : step === 1 ? (
                            <Input
                                type="email"
                                label="E-mail"
                                required
                                error={erroEmail}
                                value={email}
                                onChangeText={(e) => {
                                    setEmail(e)
                                    setErroEmail(false)
                                }}
                            />
                        ) : (
                            <>
                                <Input
                                    type="password"
                                    label="Crie uma senha"
                                    value={password}
                                    error={erroPassword}
                                    onChangeText={(e) => {
                                        setPassword(e)
                                        setErroPassword(false)
                                    }}
                                />
                                
                                <Input
                                    type="password"
                                    label="Repita a senha"
                                    value={repeatPassword}
                                    error={erroRepeatPassword}
                                    onChangeText={(e) => {
                                        setRepeatPassword(e)
                                        setErroRepeatPassword(false)
                                    }}
                                />
                            </>
                        )}
                    </View>

                </View>


                <View style={{alignItems: 'flex-end'}}>
                    <ShortButton 
                        width="100%"
                        backgroundColor={colors.turquoise}
                        text="Entrar"
                        accessibilityHint="Pressione para fazer login!"
                        type={step > 1 ? 'done' : 'next'}
                        onPress={() => setStep(step+1)}
                    />
                </View>
            </View>
        </Screen>
    )
}

export default Subscribe
