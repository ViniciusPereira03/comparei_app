import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Screen from '../../components/Screen'
import { format } from 'date-fns'
import { colors } from '../../assets/colors/global'
import BackButton from '../../components/BackButton'
import { router } from 'expo-router'
import { getRanking } from "../../services/users/user"
import { useFocusEffect } from '@react-navigation/native'
import {SERVICES_URL} from '../../services/api'
import Card from '../../components/Card'
const BASE_URL = SERVICES_URL.USERS;


const Profile = () => {
    const [ranking, setRanking] = useState([])
    const [load, setLoad] = useState(false)

    const getRankingUsers = async () => {
        try {
            const response = await getRanking()
            setRanking(response)
            setLoad(true)
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar o ranking", [
                {text: "Ok", callbackOrButtons: router.back()}
            ])
            setLoad(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            getRankingUsers()
        }, [])
    )


    return (
        <Screen style={{  justifyContent: 'center' }}>
            {load && (
                <View style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'flex-start',
                }}>
                    <BackButton 
                        accessibilityHint="Pressione para voltar"
                        onPress={() => router.back()}
                    />

                    {ranking.length > 0 ? (
                        <View style={{width: '100%', paddingBottom: 100}}>
                            {ranking.map((user, i) => (
                                <Card key={i}>
                                    <View
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            gap: 8,
                                        }}
                                    >

                                        {user.photo ? (
                                            <Image
                                                source={{ uri: `${BASE_URL}${user.photo}` }}
                                                style={styled.profileImage}
                                            />
                                        ) : (null)}

                                        <View>
                                            <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom: 4}}>{user.name} </Text>
                                            <Text style={{fontSize: 14, fontWeight: 'italic', paddingBottom: 16}}>{user.username} </Text>
                                            <Text>Entrou em:  {format(new Date(user.created_at), "dd/MM/yyyy HH:mm:ss")} </Text>
                                        </View>

                                        <View style={{
                                            marginLeft: 'auto',
                                            alignItems: 'center',
                                        }}>
                                            <Text>Nível </Text>
                                            <Text style={{fontSize: 24, fontWeight: 'bold', paddingBottom: 4}}>{user.level} </Text>
                                        </View>
                                    </View>
                                </Card>
                            ))}
                        </View>
                    ) : (null)}
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
        width: 48,
        height: 48,
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
