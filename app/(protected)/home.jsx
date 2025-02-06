import { Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Screen from '../../components/Screen'
import Button from '../../components/Button'
import { colors } from '../../assets/colors/global'
import AnimatedModal from '../../components/Modal'
import Card from '../../components/Card'
import ImageHome from '../../assets/images/home/image_home.js'
import { useAuth } from '../../contexts/authContext'
import { router } from 'expo-router'
import { getLists } from '../../services/mock/lists/list.js'
import Badge from '../../components/Badge.jsx'
import { useFocusEffect } from '@react-navigation/native'
import { useList } from '../../contexts/listContext'

const Home = () => {
    const { onLogout } = useAuth();
    const { onOpen } = useList();

    const [lists, setLists] = useState([])
    const [modalVisible, setModalVisible] = useState(false);


    const getLIsts = async () => {
        try {
            const response = await getLists()

            if (response.length > 0) {
                for (const l of response) {
                    if (l.status) {
                        onOpen(l.id, l.title, l.created);
                        break;
                    }
                }
    
                setLists(response)
            }

        } catch (error) {
            
        }
    }

    useFocusEffect(
        useCallback(() => {
            getLIsts()
            
            return () => {
                setLists([])
            }
        }, [])
    );


    return (
        <Screen scroll>
            <View style={{
                height: '100%',
                marginVertical: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <View style={{
                    width: '100%',
                    paddingBottom: 16
                }}>
                    <Button 
                        width='100%'
                        backgroundColor={colors.turquoise}
                        text="Criar lista"
                        accessibilityHint="Pressione para criar uma lista!"
                        type="add"
                        onPress={() => router.replace({
                            pathname: '/createList',
                            params: {}
                        })}
                    />
                </View>

                {lists.length > 0 ? (
                    <View style={{width: '100%', paddingBottom: 100}}>
                        {lists.map((l, i) => (
                            <Card key={i}>
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        alignItems: 'flex-start',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom: 16}}>{l.title}</Text>

                                    <Badge 
                                        width
                                        text={l.status ? `Em andamento` : `Finalizada`}
                                        backgroundColor={l.status ? colors.hookers_green : colors.scarlet}
                                        outline
                                    />
                                </View>
                                <Text>Criada em: {l.created}</Text>
                            </Card>
                        ))}

                        <Button 
                            width='auto'
                            backgroundColor={colors.scarlet}
                            outline
                            text="Logout"
                            accessibilityHint="Pressione para criar uma lista!"
                            type="error"
                            onPress={() => {
                                setLists([])
                                onLogout()
                            }}
                        />
                    </View>
                ) : (
                    <View style={{marginTop: "60%"}}>
                        <ImageHome width={160} height={133.48} />

                        <Button 
                            width='auto'
                            backgroundColor={colors.turquoise}
                            text="Criar lista"
                            accessibilityHint="Pressione para criar uma lista!"
                            type="add"
                            onPress={() => router.replace({
                                pathname: '/createList',
                                params: {}
                            })}
                        />
                        {/* <Button 
                            width='auto'
                            backgroundColor={colors.turquoise}
                            text="c produto"
                            accessibilityHint=""
                            onPress={() => router.replace({
                                pathname: '/createProduct',
                                params: {}
                            })}
                        />
                        <Button 
                            width='auto'
                            backgroundColor={colors.turquoise}
                            text="e produto"
                            accessibilityHint=""
                            onPress={() => router.replace({
                                pathname: '/editProduct',
                                params: {}
                            })}
                        /> */}
                    </View>
                )}
            </View>
        </Screen>
    )
}

export default Home
