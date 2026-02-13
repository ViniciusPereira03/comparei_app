import { Image, StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import Screen from '../../components/Screen.jsx'
import { router, useLocalSearchParams } from 'expo-router'
import { colors } from '../../assets/colors/global.jsx'
import BackButton from '../../components/BackButton.jsx'
import Button from '../../components/Button.jsx'
import Card from '../../components/Card.jsx'
import Badge from '../../components/Badge.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import { format } from 'date-fns'
import { useFocusEffect } from '@react-navigation/native'
import * as Location from 'expo-location'
import { confirmProductValue, getProductByMarket } from '../../services/products/promer.tsx'
import { getListaById, removeItemToList, checkItem } from '../../services/lists/listas.tsx'
import ListNoItems from '../../assets/images/list/list_no_items.js'
import { SERVICES_URL } from '../../services/api.tsx';

const List = () => {
    const params = useLocalSearchParams()

    const [showListType, setShowListType] = useState(1)
    const [items, setItems] = useState([])
    const [listId, setListId] = useState(0)
    const [listName, setListName] = useState('')
    const [loading, setLoading] = useState(true)
    const [showButtons, setShowButtons] = useState(false)
    const BASE_URL_PROMER = SERVICES_URL.PROMER;

    const confirmarValor = async (data) => {
        try {
            await Promise.all([
                confirmProductValue(data.product_id, data.market_id, data.price),
                checkItem(data.item_id, true)
            ])

            loadList()
        } catch (error) {
            // console.error("Erro ao confirmar valor:", error)
            console.log(error)
            Alert.alert("Erro", "Occoreu um erro ao confirmar o valor do produto")
        }
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

    const removerItemDaLista = async (itemID) => {
        try {
            await removeItemToList(itemID)
            loadList()
        } catch (error) {
            console.log(error)
            Alert.alert("Erro", "Ocorreu um erro ao remover item da lista de compras")
        }
    }

    const loadList = async () => {
        try {
            if (params.id) {
                const response = await getListaById(params.id)

                setListId(response.id)
                setListName(response.nome)
                setItems(response.itens ?? [])
                
                if (response.itens !== null) {
                    if (response.itens.length > 0) {
                        setShowButtons(true)
                    }
                }
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadList()

            return () => {
                setItems([])
                setShowListType(1)
            }
        }, [params.id])
    )

    // ============================
    // CARD ITEM CORRETO
    // ============================

    const CardItem = ({ item }) => {
        const [data, setData] = useState(null)
        const [loadingItem, setLoadingItem] = useState(true)

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await getProductByMarket(
                        item.produto_id,
                        item.mercado_id
                    )
                    setData(response)
                } catch (error) {
                    console.error(error)
                } finally {
                    setLoadingItem(false)
                }
            }

            fetchData()
        }, [item.produto_id, item.mercado_id])

        if (loadingItem) {
            return (
                <Card width="100%">
                    <Text>Carregando item...</Text>
                </Card>
            )
        }

        if (!data) return null

        return (
            <Card
                width="100%"
                style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
            >
                <View style={{ width:"100%", flexDirection: 'row', justifyContent: "space-between" }}>
                    <Image
                        source={{
                            uri: `${BASE_URL_PROMER}/produto/image/${data.produto.bar_code}`
                        }}
                        style={{ width: 136, height: 136 }}
                    />

                    <View style={{ width: "55%" }}>
                        <Badge
                            text={data.mercado.nome}
                            backgroundColor={colors.hookers_green}
                        />

                        <Text>{data.produto.nome}</Text>

                        <Text style={styles.price}>
                            R$ {`${data.preco_unitario.toFixed(2)}`.replace('.', ',')}
                        </Text>

                        <ProgressBar percentage={data.nivel_confianca} />

                        <Text style={styles.update}>
                            Atualizado em: {format(new Date(data.modified_at), "dd/MM/yyyy")}
                        </Text>
                    </View>
                </View>

                {!item.checked && (
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Button
                            type='edit'
                            backgroundColor={colors.turquoise}
                            width='49%'
                            text='editar valor'
                            onPress={() => editarValor({
                                product_id: data.produto.id,
                                market_id: data.mercado.id
                            })}
                            marginTop={8}
                        />

                        <Button
                            type='success'
                            backgroundColor={colors.turquoise}
                            width='49%'
                            text='confirmar valor'
                            onPress={() => confirmarValor({
                                product_id: data.produto.id,
                                market_id: data.mercado.id,
                                price: data.preco_unitario,
                                item_id: item.id
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
                    onPress={() => removerItemDaLista(item.id)}
                    marginTop={8}
                />
            </Card>
        )
    }

    const filteredItems = items.filter(item =>
        showListType === 1
            ? !item.checked
            : item.checked
    )

    const styles = StyleSheet.create({
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
        <Screen 
            // scroll={false}
        >
            <View style={{
                flex: 1,
                paddingBottom: 88,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <BackButton
                        accessibilityHint="Pressione para voltar"
                        onPress={() => router.back()}
                    />

                    <Text style={styles.title}>{listName}</Text>
                </View>

                {!loading && showButtons ? (
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                    }}>
                        <Button
                            backgroundColor={colors.turquoise}
                            width='45%'
                            text='pendentes'
                            onPress={() => setShowListType(1)}
                            outline={showListType !== 1}
                        />

                        <Button
                            backgroundColor={colors.turquoise}
                            width='45%'
                            text='confirmados'
                            onPress={() => setShowListType(2)}
                            outline={showListType !== 2}
                        />
                    </View>
                ) : (<></>)}

                {loading ? (
                    <Text>Carregando lista...</Text>
                ) : filteredItems.length > 0 ? (
                    <>

                        <FlatList
                            data={filteredItems}
                            keyExtractor={(item) =>
                                `${item.produto_id}-${item.mercado_id}`
                            }
                            renderItem={({ item }) => (
                                <CardItem item={item} />
                            )}
                        />
                    </>
                ) : (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ListNoItems
                            width={160}
                            height={149.11}
                        />

                        <Text>Nenhum item foi adicionado à lista</Text>

                        <Button
                            backgroundColor={colors.turquoise}
                            text="Adicionar item"
                            type="add"
                            onPress={() => router.push('/search')}
                        />
                    </View>
                )}
            </View>
        </Screen>
    )
}

export default List
