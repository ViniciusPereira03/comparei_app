import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../../components/Screen'
import Button from '../../components/Button'
import { colors } from '../../assets/colors/global'
import AnimatedModal from '../../components/Modal'
import Card from '../../components/Card'
import ImageHome from '../../assets/images/home/image_home.js'
import { useAuth } from '../../contexts/authContext'
import { router } from 'expo-router'

const Home = () => {
    const { onLogout } = useAuth();

    const [lists, setLists] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        console.log("HOME AQUI")
    }, [])

    useEffect(() => {
        console.log("lists: ", lists)
    }, [lists])

    return (
        <Screen scroll>
            <View style={{
                height: '100%',
                marginVertical: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {lists.length > 0 ? (
                    <View style={{width: '100%', paddingBottom: 100}}>
                        {lists.map((l, i) => (
                            <Card key={i}>
                                <Text>Lista {i}</Text>
                                <Text>Texto da lista: {l.value}</Text>
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
