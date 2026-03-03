/**
 * TODO:
 * 1. Bug ao pesquisar produto por foto. Quando faço a primeira pesquisa OK, quando faço a segunda pesquisa os campos do produto ficam preenchidos com os dados da primeira pesquisa - OK
 * 2. Bug ao confirmar todos os itens da lista, a visualização volta como se não houvesse item nenhum na lista. - OK
 * 3. Ajuste na tela do usuário, inserir imagem default para quando usuário não possui imagem - OK
 * 4. Adicionar mensagem de erro quando pesquisa por texto não retornar nenhum resultado - OK
 * 5. Bug no botão de voltar na tela search, o erro acontece se abrir uma lista ativa, clicar em adicionar item e tentar voltar. - OK
 * 6. A consulta de produto por código de barras está com erro (investigar) - OK
 * 7. Ao clicar em voltar na tela da lista, sempre volta para a tela search, independente de qual foi a tela anterior. - OK
 * 8. Criar função para "FINALIZAR" lista ativa.
 * 9. Testar no Android
 * 
 */


import { Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Screen from '../../components/Screen'
import Button from '../../components/Button'
import { colors } from '../../assets/colors/global'
import Card from '../../components/Card'
import ImageHome from '../../assets/images/home/image_home.js'
import { router } from 'expo-router'
import { getListas } from '../../services/lists/listas.tsx'
import Badge from '../../components/Badge.jsx'
import { useFocusEffect } from 'expo-router'
import { useList } from '../../contexts/listContext'
import { format } from 'date-fns'

const Home = () => {
    const { onOpen } = useList();

    const [lists, setLists] = useState([])
    const status = {
        ABERTA: "Em andamento",
        FECHADA: "Fechada",
        CANCELADA: "Cancelada"
    }
    const statusColor = {
        ABERTA: colors.hookers_green,
        FECHADA: colors.scarlet,
        CANCELADA: colors.scarlet
    }

    const getLists = async () => {
        try {
            const response = await getListas()

            if (response.length > 0) {
                for (const l of response) {
                    if (l.status === "ABERTA") {
                        onOpen(l.id, l.nome, l.created_at);
                        break;
                    }
                }
    
                setLists(response)
            }
        } catch (error) {
            
        }
    }

    const openList = (id) => {
        router.push({
            pathname: '/list',
            params: { id }
        })
    }

    useFocusEffect(
        useCallback(() => {
            getLists()
            
            return () => {
                setLists([])
            }
        }, [])
    );

    return (
        <Screen scroll>
            <View style={{
                height: '100%',
                marginVertical: 'auto',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>

                <View style={{
                    width: '100%',
                    paddingBottom: 16
                }}>
                    <Button 
                        width='100%'
                        backgroundColor={colors.turquoise}
                        text="Criar lista"
                        accessibilityHint="Pressione para criar uma lista!"
                        type="add"
                        onPress={() => router.replace({
                            pathname: '/createList',
                            params: {}
                        })}
                    />
                </View>

                {lists.length > 0 ? (
                    <View style={{width: '100%', paddingBottom: 100}}>
                        {lists.map((l, i) => (
                            <Card key={i}>
                                <TouchableOpacity onPress={() => openList(l.id)}>
                                    <View
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom: 16}}>{l.nome}</Text>

                                        <Badge 
                                            width
                                            text={status[l.status]}
                                            backgroundColor={statusColor[l.status]}
                                            outline
                                        />
                                    </View>
                                    <Text>Criada em:  {format(new Date(l.created_at), "dd/MM/yyyy HH:mm:ss")}</Text>

                                </TouchableOpacity>
                            </Card>
                        ))}

                        
                    </View>
                ) : (
                    <View style={{marginTop: "60%"}}>
                        <ImageHome width={160} height={133.48} />

                        <Button 
                            width='auto'
                            backgroundColor={colors.turquoise}
                            text="Criar lista"
                            accessibilityHint="Pressione para criar uma lista!"
                            type="add"
                            onPress={() => router.replace({
                                pathname: '/createList',
                                params: {}
                            })}
                        />
                    </View>
                )}
            </View>
        </Screen>
    )
}

export default Home
