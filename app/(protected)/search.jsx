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


const Search = () => {
    const [search, setSearch] = useState("")
    const [openFilter, setOpenFilter] = useState(false)
    const [filtroOrdem, setFiltroOrdem] = useState(false)
    const [items] = useState([
        {
          image: "https://example.com/images/arroz.jpg",
          market: "Supermercado ABC",
          product: "Arroz 5kg",
          confidence: 95,
          price: 23.99,
          updatedAt: "2025-01-25"
        },
        {
          image: "https://example.com/images/feijao.jpg",
          market: "Mercado XYZ",
          product: "Feijão Carioca 1kg",
          confidence: 30,
          price: 8.49,
          updatedAt: "2025-01-24"
        },
        {
          image: "https://example.com/images/leite.jpg",
          market: "Hipermercado Delta",
          product: "Leite Integral 1L",
          confidence: 65,
          price: 4.99,
          updatedAt: "2025-01-23"
        },
        {
          image: "https://example.com/images/oleo.jpg",
          market: "Supermercado ABC",
          product: "Óleo de Soja 900ml",
          confidence: 100,
          price: 7.29,
          updatedAt: "2025-01-22"
        },
        {
          image: "https://example.com/images/acucar.jpg",
          market: "Mercado da Esquina",
          product: "Açúcar Refinado 1kg",
          confidence: 57,
          price: 3.89,
          updatedAt: "2025-01-24"
        },
        {
          image: "https://example.com/images/cafe.jpg",
          market: "Mercado XYZ",
          product: "Café em Pó 500g",
          confidence: 96,
          price: 12.49,
          updatedAt: "2025-01-26"
        },
        {
          image: "https://example.com/images/macarrao.jpg",
          market: "Hipermercado Delta",
          product: "Macarrão Espaguete 500g",
          confidence: 10,
          price: 4.49,
          updatedAt: "2025-01-24"
        },
        {
          image: "https://example.com/images/detergente.jpg",
          market: "Supermercado ABC",
          product: "Detergente Líquido 500ml",
          confidence: 2,
          price: 2.39,
          updatedAt: "2025-01-25"
        },
        {
          image: "https://example.com/images/sabonete.jpg",
          market: "Mercado da Esquina",
          product: "Sabonete Neutro 90g",
          confidence: 20,
          price: 1.79,
          updatedAt: "2025-01-23"
        },
        {
          image: "https://example.com/images/frango.jpg",
          market: "Hipermercado Delta",
          product: "Peito de Frango Resfriado 1kg",
          confidence: 71,
          price: 14.99,
          updatedAt: "2025-01-26"
        }
    ])
    const [pesquisa, setPesquisa] = useState(false)

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

    return (
        <Screen scroll>
            <View style={{
                height: '100%',
                marginVertical: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
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
                            label="Texto qualquer"
                            required={false}
                            error={false}
                            value={search}
                            onChangeText={(e) => setSearch(e)}
                            hidePlaceholder
                            onBlur={() => setPesquisa(search ? true : false)}
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


                {pesquisa && items.length > 0 ? (
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
                                <Image source={{uri: "https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/17846/small/arroz-prato-fino-tipo-1-5kg_58932.jpg"}} width={136} height={136}/>
                                
                                <View style={{
                                    width: '100%',
                                    alignItems: 'flex-start',

                                }}>
                                    <Badge text={i.market} backgroundColor={colors.hookers_green}/>
                                    <Text>{i.product}</Text>
                                    <Text style={styled.price}>R$ {i.price}</Text>
                                </View>

                                <ProgressBar percentage={i.confidence}/>
                                <Text style={styled.update}>Atualizado em: {format(new Date(i.updatedAt), "dd/MM/yyyy")}</Text>

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
                />
                
            </AnimatedModal>
        </Screen>
    )
}

export default Search
