import { Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Screen from '../../components/Screen'
import Button from '../../components/Button'
import { colors } from '../../assets/colors/global'
import Card from '../../components/Card'
import ImageHome from '../../assets/images/home/image_home.js'
import { router } from 'expo-router'
import { getListas } from '../../services/lists/listas.tsx'
import Badge from '../../components/Badge.jsx'
import { useFocusEffect } from 'expo-router'
import { useList } from '../../contexts/listContext'
import ListNoItems from '../../assets/images/list/list_no_items.js'
import { format } from 'date-fns'

const Home = () => {
    const { onOpen } = useList();

    const [lists, setLists] = useState([])

    const getLists = async () => {
        try {
            const response = await getListas()

            if (response.length > 0) {
                for (const l of response) {
                    if (l.status === "ABERTA") {
                        onOpen(l.id, l.nome, l.created_at);
                        break;
                    }
                }
    
                setLists(response)
            }
        } catch (error) {
            
        }
    }

    const openList = (id) => {
        router.push({
            pathname: '/list',
            params: { id }
        })
    }

    useFocusEffect(
        useCallback(() => {
            getLists()
            
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
                justifyContent: 'flex-start',
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
                                <TouchableOpacity onPress={() => openList(l.id)}>
                                    <View
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom: 16}}>{l.nome}</Text>

                                        <Badge 
                                            width
                                            text={l.status ? `Em andamento` : `Finalizada`}
                                            backgroundColor={l.status ? colors.hookers_green : colors.scarlet}
                                            outline
                                        />
                                    </View>
                                    <Text>Criada em:  {format(new Date(l.created_at), "dd/MM/yyyy HH:ii:ss")}</Text>

                                </TouchableOpacity>
                            </Card>
                        ))}

                        
                    </View>
                ) : (
                    <View style={{marginTop: "60%"}}>
                        <ListNoItems width={160} height={149.11}/>
                        
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
                    </View>
                )}
            </View>
        </Screen>
    )
}

export default Home
