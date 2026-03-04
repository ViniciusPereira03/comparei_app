import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import Screen from '../../components/Screen'
import Range from '../../components/Range'
import Button from '../../components/Button'
import { colors } from '../../assets/colors/global'
import BackButton from '../../components/BackButton'
import { router } from 'expo-router'
// import { getUser, putDistanceRadius, uploadProfilePhoto } from '../../services/mock/users/user' // Adicione uploadProfilePhoto
import { getUser, putDistanceRadius, uploadProfilePhoto } from "../../services/users/user"
import { useAuth } from '../../contexts/authContext'
import { useList } from '../../contexts/listContext'
import {SERVICES_URL} from '../../services/api'
import { useFocusEffect } from '@react-navigation/native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const BASE_URL = SERVICES_URL.USERS;


const Profile = () => {
    const [profile, setProfile] = useState()
    const [medal, setMedal] = useState('bronze')
    const [load, setLoad] = useState(false)
    const [photo, setPhoto] = useState('')
    const { authState, onLogout } = useAuth();
    const { onClose } = useList();
    

    const updateDistanceRadius = async (e) => {
        await putDistanceRadius(e, authState.id)
    }

    const getProfile = async () => {
        try {
            const response = await getUser(authState.id)
            if (response.photo) {
                const urlPhoto = { uri: `${BASE_URL}${response.photo}`}
                setPhoto(urlPhoto)
            } else {
                const urlPhoto = require(`../../assets/images/profile/default_profile.png`)
                setPhoto(urlPhoto)
            }
            
            setProfile(response)
    
            setLoad(true)
            
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar o perfil do usuário", [
                {text: "Ok", callbackOrButtons: router.back()}
            ])
            setLoad(false)
        }
        
    }

    useEffect(() => {
        if (profile) {
            if (profile.level < 33) {
                setMedal(require(`../../assets/images/profile/bronze.png`))
            } else if (profile.level < 66) {
                setMedal(require(`../../assets/images/profile/silver.png`))
            } else {
                setMedal(require(`../../assets/images/profile/gold.png`))
            }
        }
    }, [profile])

    useFocusEffect(
        useCallback(() => {

            if (authState?.id) {
                getProfile()
            }

            return () => {
                setProfile("");
                setPhoto("");
            }
        }, [])
    );

    const handleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para mudar a foto.')
            return
        }

        const options = ['Tirar Foto', 'Escolher da Galeria', 'Cancelar']
        Alert.alert('Alterar Foto', 'Escolha uma opção', [
            { text: options[0], onPress: () => pickImage(true) },
            { text: options[1], onPress: () => pickImage(false) },
            { text: options[2], style: 'cancel' }
        ])
    }

    const pickImage = async (camera) => {
        let result
        if (camera) {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            })
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            })
        }

        if (!result.canceled) {
            uploadImage(result.assets[0].uri)
        }
    }

    const uploadImage = async (imageUri) => {
        try {
            const response = await uploadProfilePhoto(authState.id, imageUri);

            setProfile((prev) => ({
                ...prev,
                photo: response.photo,
            }));

            getProfile()
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Ocorreu um erro ao enviar a foto.');
        }
    };

    const logout = () => {
        onClose()
        onLogout()
    }

    return (
        <Screen style={{  justifyContent: 'center' }}>
            {load && (
                <View style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'flex-start',
                }}>
                    <View style={{
                        width: '100%',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    }}>
                        <BackButton 
                            accessibilityHint="Pressione para voltar"
                            onPress={() => router.back()}
                        />

                        <TouchableOpacity 
                            style={{ padding: 8}}
                            activeOpacity={0.9} 
                            accessible={true}
                            accessibilityLabel={`Botão para ver ranking de usuários`}
                            accessibilityHint={`Pressione para ver o ranking de usuários`}
                            onPress={() => router.push('/ranking')}
                        >
                            <MaterialCommunityIcons name="podium-gold" size={24} color={colors.hookers_green} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: '30%' }}>
                        <View style={styled.profile_view}>
                            <TouchableOpacity onPress={handleImagePicker}>
                                {photo && (
                                    <Image
                                        source={photo}
                                        style={styled.profileImage}
                                    />
                                )}
                            </TouchableOpacity>
                            <Image source={medal} style={styled.medal} />
                            <Text style={styled.level}>{profile.level} </Text>
                        </View>

                        <View style={{ alignItems: 'center', marginTop: 16 }}>
                            <Text style={styled.name}>{profile.name} </Text>
                            <Text style={styled.username}>{profile.username} </Text>
                        </View>

                        <View style={{ width: '100%', marginTop: 32 }}>
                            <Text>Buscar mercados no raio </Text>
                            <Range 
                                min={1}
                                max={35}
                                initial={profile.ray_distance}
                                unidade={'Km'}
                                onChange={(e) => updateDistanceRadius(e)}
                                marginVertical={'0'}
                                width={'100%'}
                            />
                        </View>

                        <Button 
                            width='auto'
                            backgroundColor={colors.scarlet}
                            outline
                            text="Logout"
                            accessibilityHint="Pressione para criar uma lista!"
                            type="error"
                            onPress={() => logout()}
                        />
                    </View>
                </View>
            )}
        </Screen>
    )
}

const styled = StyleSheet.create({
    name: {
        alignItems: 'center',
        fontSize: 14,
        color: colors.hookers_green
    },
    username: {
        alignItems: 'center',
        fontSize: 12,
        color: colors.battleship_gray
    },
    profile_view: {
        alignItems: 'center',
    },
    profileImage: {
        width: 141,
        height: 141,
        margin: 'auto',
        borderRadius: 100,
    },
    medal: {
        position: 'absolute',
        left: '55%',
        width: 48,
        height: 48
    },
    level: {
        width: 32,
        height: 32,
        backgroundColor: colors.turquoise,
        padding: 4,
        margin: 'auto',
        marginTop: -16,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 100,
        color: colors.font.to_background.turquoise,
        fontSize: 18
    }
})

export default Profile
