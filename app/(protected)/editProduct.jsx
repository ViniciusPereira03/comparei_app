import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Screen from '../../components/Screen'
import Button from '../../components/Button'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '../../assets/colors/global'
import Input from '../../components/Input'
import BackButton from '../../components/BackButton'
import { useAuth } from '../../contexts/authContext'
import { useFocusEffect } from '@react-navigation/native'
import { getProductByMarket, updateProduct } from '../../services/products/promer.tsx'

const EditProduct = () => {
    const { authState } = useAuth();
    const params = useLocalSearchParams();
    const [preco, setPreco] = useState("")

    const styled = StyleSheet.create({
        title: {
            color: colors.hookers_green,
            fontSize: 24,
        }
    })

    const salvar = async () => {
            const product_id = parseInt(params.product_id)
            const market_id = parseInt(params.market_id)
            const price = parseFloat(parseFloat(`${preco}`.replace(',', '.')).toFixed(2))

        try {
            const update = await updateProduct(product_id, market_id, price)
            console.log("update: ", update)
    
            router.replace('/home')
        } catch (error) {
            console.error("Erro ao atualizar produto:", error)
            Alert.alert("Erro", "Não foi possível atualizar o produto.")
        }

    }

    const loadProduct = async (params) => {
        console.log("PARAMS: ", params)
        if (params.product_id && params.market_id) {
            try {
                const productID = parseInt(params.product_id)
                const marketID = parseInt(params.market_id)

                const product = await getProductByMarket(productID, marketID)
                setPreco(`${product.preco_unitario}`)
            } catch (error) {
                console.error("Erro ao carregar produto:", error)
                Alert.alert("Erro", "Não foi possível carregar o produto para edição.")
            }
        }
    }




    useFocusEffect(
        useCallback(() => {
            loadProduct(params);

            return () => {
                setPreco("");
            }
        }, [params.product_id])
    );

    return (
        <Screen style={{ justifyContent: 'flex-start' }}>
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
                
                <Text style={styled.title}>Editar valor do produto </Text>
            </View>

            <View style={{
                width: '100%',
                height: '90%',
                marginVertical: 'auto',
                justifyContent: 'space-between',
            }}>
                <Input
                    type="numeric"
                    label="Preço do produto"
                    error={false}
                    value={`${preco}`.replace(".", ",")}
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
