import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../../components/Screen'
import Range from '../../components/Range'
import { colors } from '../../assets/colors/global'
import BackButton from '../../components/BackButton'
import { router } from 'expo-router'
import { getUser, putDistanceRadius } from '../../services/mock/users/user'

const Profile = () => {
    const [profile, setProfile] = useState()
    const [medal, setMedal] = useState('bronze')
    const [load, setLoad] = useState(false)

    const updateDistanceRadius = async (e) => {
        const response = await putDistanceRadius(e)
        setProfile(response)
    }

    const getProfile = async () => {
        const response = await getUser()
        setProfile(response)
        setLoad(true)
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

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <Screen
            style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {load && (
                <View style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'flex-start',
                    alignItems: 'centert',

                }}>
                    <BackButton 
                        accessibilityHint="Pressione para voltar"
                        onPress={() => {
                            router.back()
                        }}
                    />

                    <View style={{marginTop: '30%'}}>
                        <View style={styled.profile_view}>
                            <Image src={profile.photo} style={{ width: 141, height: 141, margin: 'auto', borderRadius: 100}}/>
                            <Image source={medal} style={styled.medal} />
                            <Text style={styled.level}>{profile.level}</Text>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            marginTop: 16
                        }}>
                            <Text style={styled.name}>{profile.name}</Text>
                            <Text style={styled.username}>{profile.username}</Text>
                        </View>

                        <View style={{
                            width: '100%',
                            marginTop: 32
                        }}>
                            <Text>Buscar mercados no raio</Text>
                            <Range 
                                min={2}
                                max={35}
                                initial={profile.distance_radius}
                                unidade={'Km'}
                                onChange={(e) => updateDistanceRadius(e)}
                                marginVertical={'0'}
                                width={'100%'}
                            />
                        </View>
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

    },
    medal: {
        position: 'absolute',
        marginLeft: '55%',
        width: 48,
        height: 48
    },
    level: {
        backgroundColor: colors.turquoise,
        padding: 8,
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
