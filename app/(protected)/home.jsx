import { Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Screen from '../../components/Screen'
import Button from '../../components/Button'
import { colors } from '../../assets/colors/global'
import AnimatedModal from '../../components/Modal'
import Card from '../../components/Card'
import ImageHome from '../../assets/images/home/image_home.js'
import { useAuth } from '../../contexts/authContext'
import { router } from 'expo-router'
import { getLists } from '../../services/mock/lists/list.js'
import Badge from '../../components/Badge.jsx'
import { useFocusEffect } from '@react-navigation/native'

const Home = () => {
    const { onLogout } = useAuth();

    const [lists, setLists] = useState([])
    const [modalVisible, setModalVisible] = useState(false);


    const getLIsts = async () => {
        try {
            const response = await getLists()
            console.log(response)
            setLists(response)
        } catch (error) {
            
        }
    }

    useFocusEffect(
        useCallback(() => {
            getLIsts()
            
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
                justifyContent: 'center',
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
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        alignItems: 'flex-start',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Text style={{fontSize: 18, fontWeight: 'bold', paddingBottom: 16}}>{l.title}</Text>

                                    <Badge 
                                        width
                                        text={l.status ? `Em andamento` : `Finalizada`}
                                        backgroundColor={l.status ? colors.hookers_green : colors.scarlet}
                                        outline
                                    />
                                </View>
                                <Text>Criada em: {l.created}</Text>
                            </Card>
                        ))}

                        <Button 
                            width='auto'
                            backgroundColor={colors.scarlet}
                            outline
                            text="Logout"
                            accessibilityHint="Pressione para criar uma lista!"
                            type="error"
                            onPress={() => {
                                setLists([])
                                onLogout()
                            }}
                        />
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
                        {/* <Button 
                            width='auto'
                            backgroundColor={colors.turquoise}
                            text="c produto"
                            accessibilityHint=""
                            onPress={() => router.replace({
                                pathname: '/createProduct',
                                params: {}
                            })}
                        />
                        <Button 
                            width='auto'
                            backgroundColor={colors.turquoise}
                            text="e produto"
                            accessibilityHint=""
                            onPress={() => router.replace({
                                pathname: '/editProduct',
                                params: {}
                            })}
                        /> */}
                    </View>
                )}
            </View>

            

            {/* <Input
                type="password"
                label="Senha"
                value={text}
                onChangeText={(e) => setText(e)}
            />

            <Input
                type="email"
                label="E-mail"
                required
                error={false}
                value={text}
                onChangeText={(e) => setText(e)}
            />
            
            <Input
                type="text"
                label="Texto qualquer"
                required={false}
                error={false}
                value={text}
                onChangeText={(e) => setText(e)}
            />
            
            <Input
                type="numeric"
                label="Numérico"
                required={false}
                error={false}
                value={text}
                onChangeText={(e) => setText(e)}
            />

            <Card>
                <Select
                    label="Select"
                    // required={true}
                    options={[
                        { value: "1", label: "Opção 1" },
                        { value: "2", label: "Opção 2" },
                        { value: "3", label: "Opção 3" },
                        { value: "4", label: "Opção 4" },
                        { value: "5", label: "Opção 5" },
                        { value: "6", label: "Opção 6" },
                    ]}
                    value={""}
                    onValueChange={(newValue) => console.log(newValue)}
                />

                <Range 
                    min={0} 
                    max={50} 
                    initial={25} 
                    step={1} 
                    onChange={(e) => console.log(e)}
                    unidade=" Km"
                />

                <ProgressBar percentage={46} />
            </Card> */}

            

            

            <AnimatedModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 10 }}>Ordenar por</Text>
                <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 10 }}>Ordenar por</Text>

                <Button 
                    backgroundColor={colors.scarlet}
                    text="fechar"
                    accessibilityHint="Pressione para testar o botão!"
                    type="error"
                    onPress={() => setModalVisible(false)}
                />
                
            </AnimatedModal>
        </Screen>
    )
}

export default Home
