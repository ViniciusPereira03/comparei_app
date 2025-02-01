import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Screen from '../../components/Screen.jsx'
import { router, useLocalSearchParams,  } from 'expo-router'
import { colors } from '../../assets/colors/global.jsx'
import BackButton from '../../components/BackButton.jsx'
import Button from '../../components/Button.jsx'
import Card from '../../components/Card.jsx'
import Badge from '../../components/Badge.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';


const Camera = () => {
    const params = useLocalSearchParams();
    const [item, setItems] = useState(false);

    const confirmarValor = () => {
        console.log("Confirmar valor")
    }

    const editarValor = () => {
        console.log("Editar valor")
    }

    const loadList = () => {
        if (params.id) {
            setItems(
                {
                    image: "https://example.com/images/arroz.jpg",
                    product: "Arroz t5kg",
                    markets: [
                        {
                            market: "Supermercado ABC",
                            confidence: 95,
                            price: 23.99,
                            updatedAt: "2025-01-25"
                        },
                        {
                            market: "Mercado 123",
                            confidence: 30,
                            price: 16.99,
                            updatedAt: "2024-01-30"
                        },
                        {
                            market: "Mercado do zé",
                            confidence: 57,
                            price: 22.50,
                            updatedAt: "2025-01-20"
                        },
                    ]
                }
            )
        } else {
            router.replace('/cameraSearch')
        }
    }

    useFocusEffect(
        useCallback(() => {
          loadList();

          return () => {
            setItems(null)
            params.id = false;
          }
        }, [params.id])
    );

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
                    
                    <Text style={styled.title}>Produto encontrado</Text>
                </View>

                {item && (
                    <Card 
                        width="100%"
                        style={{
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                        }}
                    >
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                paddingVertical: 8
                            }}>
                                <Image source={{uri: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/17846/small/arroz-prato-fino-tipo-1-5kg_58932.jpg"}} width={136} height={136}/>
                                <Text style={{fontSize: 24}}>{item.product}</Text>
                            </View>

                            {item.markets.map((m, index) => (
                                    <View key={index} style={{
                                    width: "100%",
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: index % 2 === 0 ? colors.mint_green : colors.white,
                                    paddingVertical: 8
                                }}>
                                    <View>
                                        <Badge text={m.market} backgroundColor={colors.hookers_green}/>
                                        <ProgressBar percentage={m.confidence}/>
                                        <Text style={styled.update}>Atualizado em: {format(new Date(m.updatedAt), "dd/MM/yyyy")}</Text>
                                    </View> 

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text style={styled.price}>R$ {m.price}</Text>
                                        
                                        
                                        <Button 
                                            type='edit'
                                            backgroundColor={colors.turquoise}
                                            width={32}
                                            text=''
                                            accessibilityLabel="Botão para editar produto"
                                            accessibilityHint="Pressione para editar o produto"
                                            onPress={() => editarValor()}
                                            margin={2}
                                            marginTop={-1}
                                        />

                                        <Button 
                                            type='add'
                                            backgroundColor={colors.turquoise}
                                            width={32}
                                            text=''
                                            accessibilityLabel="Botão para adicoinar produto a lista"
                                            accessibilityHint="Pressione para adicionar o produto a sua lista"
                                            onPress={() => confirmarValor()}
                                            margin={2}
                                            marginTop={-1}

                                        />
                                    </View>
                                </View>
                            ))}
                            
                        </View>
                    </Card>  
                )}
            </View>
        </Screen>
    )
}

export default Camera
