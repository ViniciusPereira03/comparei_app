import { Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../../components/Screen'
import Button from '../../components/Button'
import { colors } from '../../assets/colors/global'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Range from '../../components/Range'
import AnimatedModal from '../../components/Modal'
import ProgressBar from '../../components/ProgressBar'
import Card from '../../components/Card'

const Home = () => {
    const [text, setText] = useState("")
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        console.log("HOME AQUI")
    }, [])

    return (
        <Screen scroll>
            <Text>Home</Text>

            <Input
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
            </Card>



            <Button 
                backgroundColor={colors.hookers_green}
                text="testar"
                accessibilityHint="Pressione para testar o botão!"
                type="success"
                onPress={() => setModalVisible(true)}
            />

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
