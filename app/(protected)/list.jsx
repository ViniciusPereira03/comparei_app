import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Screen from '../../components/Screen.jsx'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '../../assets/colors/global.jsx'
import BackButton from '../../components/BackButton.jsx'
import Button from '../../components/Button.jsx'
import Card from '../../components/Card.jsx'
import Badge from '../../components/Badge.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import { format } from 'date-fns';
import { getListProducts, removeItem } from '../../services/mock/lists/list.js'
import { useFocusEffect } from '@react-navigation/native'
import * as Location from 'expo-location';
import { confirmProductValue } from '../../services/mock/products/product.js'



const List = () => {
    const params = useLocalSearchParams();
    const [location, setLocation] = useState(null);
    const [showListType, setShowListType] = useState(1);
    const [items, setItems] = useState([]);
    const [listId, setListId] = useState(0);
    const [listName, setListName] = useState('')

    const confirmarValor = async (product) => {
        await confirmProductValue({
            ...product,
            location
        })
    }

    const editarValor = (payload) => {
        router.push({
            pathname: '/editProduct',
            params: { 
                product_id: payload.product_id,
                market_id: payload.market_id
            }
        })
    }

    const removerItemDaLista = async (payload) => {
        console.log("Remover item da lista: ", payload)
        const newList = await removeItem(payload)
        setItems(newList.products)
    }

    const loadList = async () => {
        console.log(params.id)
        if (params.id) {
            const response = await getListProducts(params.id)
            setListId(response.id)
            setListName(response.name)
            setItems(response.products)
        }
    }

    async function getCurrentLocation() {
              
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }

    useFocusEffect(
        useCallback(() => {
            loadList();
            getCurrentLocation();

            return () => {
                setItems([])
                setLocation(null)
                setShowListType(1);
            }
        }, [params.id])
    );

    const CardItem = ({ item, onEdit, onConfirm, onRemove }) => {
        return (
            <Card 
                key={item.id} 
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
                    <Image source={{uri: item.image}} width={136} height={136}/>
                    
                    <View style={{
                        width: "55%",
                        alignItems: 'flex-start'
                    }}>
                        <Badge text={item.market} backgroundColor={colors.hookers_green}/>
                        <Text>{item.product}</Text>
                        <Text style={styled.price}>R$ {`${item.price}`.replace('.', ',')}</Text>
                        <ProgressBar percentage={item.confidence}/>
                        <Text style={styled.update}>Atualizado em: {format(new Date(item.updatedAt), "dd/MM/yyyy")}</Text>
                    </View>
                </View>
                
                {!item.confirmed && (
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Button 
                            type='edit'
                            backgroundColor={colors.turquoise}
                            width='45%'
                            text='editar valor'
                            onPress={() => onEdit({
                                product_id: item.product_id,
                                market_id: item.market_id
                            })}
                            marginTop={8}
                        />

                        <Button 
                            type='success'
                            backgroundColor={colors.turquoise}
                            width='45%'
                            text='confirmar valor'
                            onPress={() => onConfirm({
                                product_id: item.product_id,
                                market_id: item.market_id,
                                price: item.price
                            })}
                            marginTop={8}
                        />
                    </View>
                )}

                <Button 
                    type='error'
                    backgroundColor={colors.scarlet}
                    width='100%'
                    text='Remover da lista'
                    onPress={() => onRemove({
                        list_id: listId,
                        product_id: item.product_id,
                        market_id: item.market_id
                    })}
                    marginTop={8}
                />
            </Card>
        )
    }

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
                paddingBottom: 88,
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
                    
                    <Text style={styled.title}>{listName}</Text>
                </View>

                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                }}>
                    <Button 
                        backgroundColor={colors.turquoise}
                        width='45%'
                        text='pendentes'
                        onPress={() => setShowListType(1)}
                        marginTop={8}
                        outline={showListType === 1 ? false : true}
                    />

                    <Button 
                        backgroundColor={colors.turquoise}
                        width='45%'
                        text='confirmados'
                        onPress={() => setShowListType(2)}
                        marginTop={8}
                        outline={showListType === 2 ? false : true}
                    />
                </View>

                {items.map((i, index) => (
                    showListType === 1 && !i.confirmed ? (
                        <CardItem 
                            key={index}
                            item={i}
                            onEdit={(data) => editarValor(data)}
                            onConfirm={(data) => confirmarValor(data)}
                            onRemove={(data) => removerItemDaLista(data)}
                        />
                    ) : showListType === 2 && i.confirmed ? (
                        <CardItem 
                            key={index}
                            item={i}
                            onEdit={(data) => editarValor(data)}
                            onConfirm={(data) => confirmarValor(data)}
                            onRemove={(data) => removerItemDaLista(data)}
                        />
                    ) : null
                ))}
                
            </View>
        </Screen>
    )
}

export default List
