import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Screen from '../../components/Screen'
import Button from '../../components/Button'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '../../assets/colors/global'
import Input from '../../components/Input'
import BackButton from '../../components/BackButton'
import { useAuth } from '../../contexts/authContext'
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native'
import { getProductById, updateProduct } from '../../services/mock/products/product'

const EditProduct = () => {
    const { authState } = useAuth();
    const params = useLocalSearchParams();
    const [location, setLocation] = useState(null);
    const [nomeProduto, setNomeProduto] = useState("");
    const [marcaProduto, setMarcaProduto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [unidade, setUnidade] = useState("");
    const [preco, setPreco] = useState("")

    const styled = StyleSheet.create({
        title: {
            color: colors.hookers_green,
            fontSize: 24,
        }
    })

    const salvar = async () => {
        console.log("salvar produto")

        const produto = {
            product_id: params.product_id,
            market_id: params.market_id,
            product: nomeProduto,
            brand: marcaProduto,
            amount: parseInt(quantidade),
            unity: unidade,
            price: parseFloat(`${preco}`.replace(',', '.')).toFixed(2),
            location,
            authState
        }
        console.log(produto)

        const update = await updateProduct(produto)
        console.log("update: ", update)

        router.replace('/home')
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

    const loadProduct = async (params) => {
        if (params.product_id && params.market_id) {
            console.log("params.product_id: ", params.product_id)
            console.log("params.market_id: ", params.market_id)

            const product = await getProductById({
                product_id: params.product_id,
                market_id: params.market_id
            })

            setNomeProduto(product.product);
            setMarcaProduto(product.brand);
            setQuantidade(`${product.amount}`);
            setUnidade(product.unity);
            setPreco(`${product.price}`)
        }
    }




    useFocusEffect(
        useCallback(() => {
            loadProduct(params);
            getCurrentLocation();

            return () => {
                setLocation(null)
                setNomeProduto("");
                setMarcaProduto("");
                setQuantidade("");
                setUnidade("");
                setPreco("");
            }
        }, [params.product_id])
    );

    return (
        <Screen>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 16
            }}>
                <BackButton 
                    accessibilityHint="Pressione para voltar"
                    onPress={() => router.replace('/search')}
                />
                
                <Text style={styled.title}>Editar produto</Text>
            </View>

            <View style={{
                width: '100%',
                height: '100%',
                marginVertical: 'auto'
            }}>
                <Input
                    width="100%"
                    type="text"
                    label="Nome do produto"
                    error={false}
                    value={nomeProduto}
                    onChangeText={(e) => setNomeProduto(e)}
                />

                <Input
                    type="text"
                    label="Marca do produto"
                    error={false}
                    value={marcaProduto}
                    onChangeText={(e) => setMarcaProduto(e)}
                />

                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{width: '48%'}}>
                        <Input
                            type="numeric"
                            label="Quantidade"
                            error={false}
                            value={quantidade}
                            onChangeText={(e) => setQuantidade(e)}
                        />
                    </View>
                    <View style={{width: '48%'}}>
                        <Input
                            type="text"
                            label="Unidade"
                            error={false}
                            value={unidade}
                            onChangeText={(e) => setUnidade(e)}
                        />
                    </View>
                </View>

                <Input
                    type="numeric"
                    label="Preço do produto"
                    error={false}
                    value={preco}
                    onChangeText={(e) => setPreco(e)}
                />

                <Button 
                    width="100%"
                    backgroundColor={colors.turquoise}
                    text="Editar"
                    accessibilityHint="Pressione para editar o produto!"
                    type="edit"
                    onPress={() => salvar()}
                />
                
            </View>
        </Screen>
    )
}

export default EditProduct
