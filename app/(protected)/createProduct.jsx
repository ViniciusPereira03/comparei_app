import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Screen from '../../components/Screen'
import Button from '../../components/Button'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { colors } from '../../assets/colors/global'
import Input from '../../components/Input'
import BackButton from '../../components/BackButton'
import { useAuth } from '../../contexts/authContext'
import { useGps } from '../../contexts/gpsContext.tsx'
import ShortButton from '../../components/ShortButton'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createProduct } from '../../services/products/promer'

const CreateProduct = () => {
    const params = useLocalSearchParams();
    const { authState } = useAuth();
    const { location, refreshLocation } = useGps();
    let cameraRef = useRef();
    const [permission, requestPermission] = useCameraPermissions();
    const [step, setStep] = useState(1);
    const [nomeProduto, setNomeProduto] = useState("");
    const [marcaProduto, setMarcaProduto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [unidade, setUnidade] = useState("");
    const [preco, setPreco] = useState("")
    const [barCode, setBarCode] = useState("")
    const [foto, setFoto] = useState("");

    const styled = StyleSheet.create({
        title: {
            color: colors.hookers_green,
            fontSize: 24,
        },
        container: {
            flex: 1,
            justifyContent: 'center',
        },
        camera: {
            flex: 1,
        },
        buttonContainer: {
            width: '100%',
            height: 80,
            position: 'absolute',
            bottom: 68,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: 'transparent',
            
        },
        picture_button: {
            alignItems: 'center',
            width: 80,
            height: 80,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 4,
            borderColor: colors.white,
            borderRadius: 100,
        },
        picture_button_2: {
            alignItems: 'center',
            width: 32,
            height: 32,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 3,
            borderColor: colors.white,
            borderRadius: 100,
        },
        button_inside: {
            width: 64,
            height: 64,
            backgroundColor: colors.white,
            borderRadius: 100,
            margin: 'auto'
        },
        button_inside_2: {
            width: 20,
            height: 20,
            backgroundColor: colors.white,
            borderRadius: 100,
            margin: 'auto'
        },
        barcode_button: {
            alignItems: 'center',
        },
        delimiter_start: {
            height: '100%',
            width: '40%',
            position: 'absolute',
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        delimiter_end: {
            height: '100%',
            width: '40%',
            position: 'absolute',
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        scanner: {
            height: '100%',
            width: 4,
            position: 'absolute',
            backgroundColor: colors.scarlet,
            left: '49.5%'
        }
    })

    const salvar = async () => {
        await refreshLocation();

        const produto = {
            nome: nomeProduto,
            marca: marcaProduto,
            quantidade: parseFloat(quantidade.replaceAll(',', '.')),
            unidade,
            bar_code: barCode,
            latitude: location ? location.latitude : null,
            longitude: location ? location.longitude : null,
            preco,
            foto
        }

        try {
            await createProduct(produto);
            setStep(1);
            setNomeProduto("");
            setMarcaProduto("");
            setQuantidade("");
            setUnidade("");
            setPreco("");
            setBarCode("");
            setFoto("");
        } catch (error) {
            console.log("Erro ao criar produto:", error);
        }

        router.replace('/search')
    }

    const scanner = (e) => {
        setBarCode(e.data)

        setTimeout(() => {
            salvar();
        }, 100);
    }
    
    const loadParams = () => {
        if (params.product) {
            const product_info = JSON.parse(params.product)
            const p = product_info

            setNomeProduto(p.nome);
            setMarcaProduto(p.marca);
            setQuantidade(`${p.quantidade}`);
            setUnidade(p.unidade);
            setPreco(`${p.preco}`.replaceAll('.', ','));
            setFoto(p.foto);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadParams();

            return () => {
                setStep(1);
                setNomeProduto("");
                setMarcaProduto("");
                setQuantidade("");
                setUnidade("");
                setPreco("");
                setBarCode("");
                setFoto("");
            }
        }, [params.product_info])
    );

    useEffect(() => {
        if (permission) {
            if (!permission.granted) {
                requestPermission()
            }
        }
    }, [permission, permission])

    return (
        <Screen>
            <View style={{
                height: '100%',
                justifyContent: 'space-between'
            }}>
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
                    
                    <Text style={styled.title}>Cadastrar produto</Text>
                </View>

                {step === 1 ? (
                    <View style={{
                        height: '90%',
                        justifyContent: 'space-between'
                    }}>
                        <View>
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
                        </View>

                        <View style={{alignItems: 'flex-end'}}>
                            <ShortButton 
                                width="100%"
                                backgroundColor={colors.turquoise}
                                text="Avançar"
                                accessibilityHint="Pressione para avançar no cadastro"
                                type={'next'}
                                onPress={() => setStep(step+1)}
                            />
                        </View>
                    </View>
                ) : (
                    <View style={styled.container}>
                        <CameraView
                            ref={cameraRef}
                            style={styled.camera}
                            enableTorch={false}
                            mode="picture"
                            barcodeScannerSettings={{
                                barcodeTypes: ['aztec', 'codabar', 'code128', 'code39', 'code93', 'ean8', 'ean13', 'upc_a', 'upc_e'],
                            }}
                            onBarcodeScanned={(e) => scanner(e)}
                        >
                            <View style={styled.buttonContainer}>
                                <TouchableOpacity style={styled.barcode_button} onPress={() => setBarcodeMode(false)}>
                                    <MaterialCommunityIcons name="barcode-scan" size={80} color={colors.white} />
                                </TouchableOpacity>
                            </View>
                        </CameraView>
                        <View style={styled.delimiter_start}></View>
                        <View style={styled.scanner}></View>
                        <View style={styled.delimiter_end}></View>
                    </View>
                )}
            </View>
        </Screen>
    )
}

export default CreateProduct
