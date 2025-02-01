import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../../components/Screen.jsx'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '../../assets/colors/global.jsx'
import BackButton from '../../components/BackButton.jsx'
import Button from '../../components/Button.jsx'
import Card from '../../components/Card.jsx'
import Badge from '../../components/Badge.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import { format } from 'date-fns';


const List = () => {
    const params = useLocalSearchParams();
    const [items, setItems] = useState([]);

    const confirmarValor = () => {
        console.log("Confirmar valor")
    }

    const editarValor = () => {
        console.log("Editar valor")
    }

    const removerItemDaLista = () => {
        console.log("Remover item da lista")
    }

    const loadList = () => {
        console.log(params.id)
        if (params.id) {
            setItems([
                {
                    "image": "https://example.com/images/arroz.jpg",
                    "market": "Supermercado ABC",
                    "product": "Arroz treste teste teste teste asyuagosydu teste 5kg",
                    "confidence": 95,
                    "price": 23.99,
                    "updatedAt": "2025-01-25"
                }
            ])
        }
    }

    useEffect(() => {
        console.log("LOAD LIST")
        loadList();

        return () => {}
    }, [])

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

    return (
        <Screen scroll>
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
                    
                    <Text style={styled.title}>Nome da lista aqui</Text>
                </View>

                {items.map((i, index) => (
                    <Card 
                        key={index} 
                        width="100%"
                        style={{
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                            <Image source={{uri: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/17846/small/arroz-prato-fino-tipo-1-5kg_58932.jpg"}} width={136} height={136}/>
                            
                            <View style={{
                                width: "55%",
                                alignItems: 'flex-start',

                            }}>
                                <Badge text={i.market} backgroundColor={colors.hookers_green}/>
                                <Text>{i.product}</Text>
                                <Text style={styled.price}>R$ {i.price}</Text>
                                <ProgressBar percentage={i.confidence}/>
                                <Text style={styled.update}>Atualizado em: {format(new Date(i.updatedAt), "dd/MM/yyyy")}</Text>
                            </View>
                        </View>

                        
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Button 
                                type='success'
                                backgroundColor={colors.turquoise}
                                width='45%'
                                text='confirmar valor'
                                onPress={() => confirmarValor()}
                                marginTop={8}
                            />
                            
                            <Button 
                                type='edit'
                                backgroundColor={colors.turquoise}
                                width='45%'
                                text='editar valor'
                                onPress={() => editarValor()}
                                marginTop={8}
                            />
                        </View>

                        <Button 
                            type='error'
                            backgroundColor={colors.scarlet}
                            width='100%'
                            text='Remover da lista'
                            onPress={() => removerItemDaLista()}
                            marginTop={8}
                        />

                    </Card>
                ))}
                
            </View>
        </Screen>
    )
}

export default List
