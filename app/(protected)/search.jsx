import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Screen from '../../components/Screen'
import ImageSearcdh from '../../assets/images/search/image_search.js'
import { router } from 'expo-router'
import Input from '../../components/Input.jsx'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../../assets/colors/global.jsx'
import BackButton from '../../components/BackButton.jsx'
import AnimatedModal from '../../components/Modal.jsx'
import Button from '../../components/Button.jsx'
import Select from '../../components/Select.jsx'
import Card from '../../components/Card.jsx'
import Badge from '../../components/Badge.jsx'
import ProgressBar from '../../components/ProgressBar.jsx'
import { format } from 'date-fns';
import { searchProduct } from '../../services/products/promer.tsx'
import { SERVICES_URL } from '../../services/api.tsx';
import { useGps } from '../../contexts/gpsContext.tsx';



const Search = () => {
    const [search, setSearch] = useState("")
    const [openFilter, setOpenFilter] = useState(false)
    const [filtroOrdem, setFiltroOrdem] = useState(false)
    const [filtroCategoria, setFiltroCategoria] = useState('')
    const [items, setItems] = useState([])
    const BASE_URL_PROMER = SERVICES_URL.PROMER;
    const { location, refreshLocation, loading } = useGps();
    
    const styled = StyleSheet.create({
        price: {
            fontSize: 24,
        },
        update: {
            fontSize: 12,
        }
    })

    const addList = (i) => {
        router.replace({
            pathname: '/createList',
            params: {
                ...i
            }
        })
    };

    const pesquisar = async () => {
        setOpenFilter(false)
        await refreshLocation();

        if (!location) {
            alert('Por favor, habilite a localização para realizar a busca por produtos próximos.')
            return;
        }

        if (search) {
            const filtro = {
                texto: search,
                ordem: filtroOrdem,
                categoria: filtroCategoria
            }

            try {
                const response = await searchProduct(filtro, location)
                setItems(response)
            } catch (error) {
                console.log("Erro ao buscar produtos:", error);
            }
        } else {
            setItems([])
        }
    }

    return (
        <Screen scroll>
            <View style={{
                height: '100%',
                marginVertical: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 88,
            }}> 
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <BackButton 
                        accessibilityHint="Pressione para voltar"
                        onPress={() => router.back()}
                    />
                    
                    <View style={{width: '80%'}}>
                        <Input 
                            type="text"
                            label="Pesquisar produto"
                            required={false}
                            error={false}
                            value={search}
                            onChangeText={(e) => setSearch(e)}
                            hidePlaceholder
                            onBlur={() => pesquisar()}
                        />
                    </View>

                    <TouchableOpacity 
                        style={{ padding: 8}}
                        activeOpacity={0.9} 
                        accessible={true}
                        accessibilityLabel={`Botão para filtrar`}
                        accessibilityHint={`Pressione para filtrar produtos`}
                        onPress={() => setOpenFilter(true)}
                    >
                        <FontAwesome name="filter" size={24} color={colors.hookers_green}/>
                    </TouchableOpacity>
                </View>

                {items === null ? (
                    <View style={{marginTop: "60%"}}>
                        <ImageSearcdh width={160} height={149.11}/>
                        <Text style={{ marginTop: 16 }}>Nenhum resultado encontrado!</Text>
                    </View>
                ) : (
                    <>
                        {items.length > 0 ? (
                            <View style={{
                                marginTop: 16,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap'
                            }}>
        
                                {items.map((i, index) => (
                                    <Card 
                                        key={index} 
                                        width="48.8%"
                                        style={{
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Image source={{uri: `${BASE_URL_PROMER}/produto/image/${i.produto.bar_code}`}} width={136} height={136}/>
                                        
                                        <View style={{
                                            width: '100%',
                                            alignItems: 'flex-start',
        
                                        }}>
                                            <Badge text={i.mercado.nome} backgroundColor={colors.hookers_green}/>
                                            <Text>{i.produto.nome}</Text>
                                            <Text style={styled.price}>R$ {i.preco_unitario}</Text>
                                        </View>
        
                                        <ProgressBar percentage={i.nivel_confianca}/>
                                        <Text style={styled.update}>Atualizado em: {format(new Date(i.modified_at), "dd/MM/yyyy")}</Text>
        
                                        <Button 
                                            type='add'
                                            backgroundColor={colors.turquoise}
                                            width='100%'
                                            text='salvar na lista'
                                            onPress={() => addList(i)}
                                        />
                                    </Card>
                                ))}
        
                            </View>
                        ) : (
                            <View style={{marginTop: "60%"}}>
                                <ImageSearcdh width={160} height={149.11}/>
                            </View>
                        )}
                    </>
                )}


            </View>

            <AnimatedModal visible={openFilter} onClose={() => setOpenFilter(false)}>
                <Text>Ordenar por</Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap'
                }}>
                    <Button 
                        width={'auto'}
                        outline={filtroOrdem === 0 ? false : true}
                        backgroundColor={colors.hookers_green}
                        text="Mais relevante"
                        accessibilityHint="Pressione para filtrar por mais relevante!"
                        onPress={() => setFiltroOrdem(0)}
                    />

                    <Button 
                        width={'auto'}
                        outline={filtroOrdem === 1 ? false : true}
                        backgroundColor={colors.hookers_green}
                        text="menor preço"
                        accessibilityHint="Pressione para filtrar por menor preço!"
                        onPress={() => setFiltroOrdem(1)}
                    />
                    
                    <Button 
                        width={'auto'}
                        outline={filtroOrdem === 2 ? false : true}
                        backgroundColor={colors.hookers_green}
                        text="mais próximos"
                        accessibilityHint="Pressione para filtrar por mais próximos!"
                        onPress={() => setFiltroOrdem(2)}
                    />
                    <Button 
                        width={'auto'}
                        outline={filtroOrdem === 3 ? false : true}
                        backgroundColor={colors.hookers_green}
                        text="última atualização"
                        accessibilityHint="Pressione para filtrar por última atualização!"
                        onPress={() => setFiltroOrdem(3)}
                    />
                </View>

                <Select 
                   label={'Categoria'} 
                   options={[
                        { value: 1, label: "Limpeza" },
                        { value: 2, label: "Alimentos" },
                        { value: 3, label: "Bebidas" },
                        { value: 4, label: "Higiene Pessoal" },
                        { value: 5, label: "Frios e Laticínios" },
                        { value: 6, label: "Carnes e Aves" },
                        { value: 7, label: "Hortifruti" },
                        { value: 8, label: "Padaria e Confeitaria" },
                        { value: 9, label: "Pet Shop" },
                        { value: 10, label: "Utensílios Domésticos" },
                        { value: 11, label: "Congelados" },
                        { value: 12, label: "Doces e Sobremesas" },
                        { value: 13, label: "Bebidas Alcoólicas" },
                        { value: 14, label: "Biscoitos e Snacks" },
                        { value: 15, label: "Massas e Grãos" },
                        { value: 16, label: "Cereais e Matinais" },
                        { value: 17, label: "Produtos Naturais" },
                        { value: 18, label: "Produtos para Bebês" },
                        { value: 19, label: "Papelaria" },
                        { value: 20, label: "Eletroportáteis" }
                   ]}
                   onValueChange={(e) => setFiltroCategoria(e)}
                />

                <Button 
                    width={'100%'}
                    backgroundColor={colors.turquoise}
                    text="Filtrar"
                    accessibilityHint="Pressione para filtrar por última atualização!"
                    onPress={() => pesquisar()}
                />
                
            </AnimatedModal>
        </Screen>
    )
}

export default Search
