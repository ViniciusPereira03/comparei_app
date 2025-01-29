import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../../components/Screen'
import { router, useLocalSearchParams } from 'expo-router'
import Input from '../../components/Input.jsx'
import { colors } from '../../assets/colors/global.jsx'
import BackButton from '../../components/BackButton.jsx'

import ImageCreateList from '../../assets/images/createList/image_createList.js'
import ShortButton from '../../components/ShortButton.jsx'


const CreateList = () => {
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

    const criarLista = () => {
        console.log("ITEM: ", item)
        console.log("Criar lista de compras: ", nomeLista);

        console.log(item.product)

        if (item.product) {
            router.replace({
                pathname: '/list',
                params: {
                    id: 123
                }
            })
        } else {
            router.replace('/list')
        }
    }
    
    useEffect(() => {
        
        return () => {
            setNomeLista("");
        }
    }, [])

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

                <View style={{width: '100%'}}>
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
        </Screen>
    )
}

export default CreateList
