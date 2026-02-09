import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Screen from '../../components/Screen'
import { router, useLocalSearchParams } from 'expo-router'
import Input from '../../components/Input.jsx'
import { colors } from '../../assets/colors/global.jsx'
import BackButton from '../../components/BackButton.jsx'

import ImageCreateList from '../../assets/images/createList/image_createList.js'
import ShortButton from '../../components/ShortButton.jsx'
import { useFocusEffect } from '@react-navigation/native'
import { useList } from '../../contexts/listContext'
import { createList } from '../../services/lists/listas.tsx'

const CreateList = () => {
    const {listState, onOpen} = useList();
    const item = useLocalSearchParams();
    const [nomeLista, setNomeLista] = useState("");

    const styled = StyleSheet.create({
        title: {
            color: colors.hookers_green,
            fontSize: 24,
        },
        price: {
            fontSize: 24,
        },
        update: {
            fontSize: 12,
        }
    })

    const criarLista = async () => {
        try {
            if (nomeLista.trim() === "") {
                Alert.alert("Atenção!", "Por favor, insira um nome para a lista.")
                return;
            }

            const lista = await createList(nomeLista)

            console.log("Lista criada com sucesso:", lista);

            onOpen(
                lista.id,
                lista.nome,
                lista.created_at
            )
    
            router.replace({
                pathname: '/list',
                params: {
                    id: lista.id
                }
            })

        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao criar a lista. Por favor, tente novamente.')
            return;
        }
        
    }

    const verificaListaAberta = () => {
        if (listState.id) {

            router.replace({
                pathname: '/list',
                params: {
                    id: listState.id
                }
            })
        }
    }
    
    useFocusEffect(
        useCallback(() => {

            verificaListaAberta()

            return () => {
                setNomeLista("");
            }
        }, [])
    );

    return (
        <Screen>
            <View style={{
                height: '100%',
                marginVertical: 'auto',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}> 

                <View style={{
                    width: '100%',
                    height: "auto",
                    alignItems: "center",
                }}>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <BackButton 
                            accessibilityHint="Pressione para voltar"
                            onPress={() => router.replace('/search')}
                        />
                        
                        <Text style={styled.title}>Criar nova lista</Text>
                    </View>

                    <View style={{width: '100%', paddingBottom: 80}}>
                        <Input 
                            type="text"
                            label="Nome da lista"
                            required={false}
                            error={false}
                            value={nomeLista}
                            onChangeText={(e) => setNomeLista(e)}
                        />
                    </View>

                    <View>
                        <ImageCreateList width={204} height={112}/>
                    </View>

                </View>
                
                
                <View style={{width: '100%' }}>
                    <View style={{width: '100%', alignItems: 'flex-end'}}>
                        <ShortButton 
                            width="100%"
                            backgroundColor={colors.turquoise}
                            text="Avançar"
                            accessibilityHint="Pressione para avançar!"
                            type={'done'}
                            onPress={() => criarLista()}
                        />
                    </View>
                </View>



            </View>
        </Screen>
    )
}

export default CreateList
