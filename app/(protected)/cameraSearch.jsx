import { StyleSheet, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors } from '../../assets/colors/global';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import BackButton from '../../components/BackButton';
import { getProductByBarcode, validaImage } from '../../services/products/promer';
import { useList } from '../../contexts/listContext';
import { useGps } from '../../contexts/gpsContext.tsx';
import { searchProduct } from '../../services/products/promer.tsx'

const CameraSearch = () => {
    const {listState} = useList();
    let cameraRef = useRef();
    const { location, refreshLocation, loading } = useGps();
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState('');
    const [barcodeMode, setBarcodeMode] = useState(false)
    const [barcodeValue, setBarcodeValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (permission) {
            if (!permission.granted) {
                requestPermission()
            }
        }
    }, [permission, permission])


    const takePic = async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            let options = {
                quality: 1,
                base64: true,
                exif: false
            }
    
            let newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto)
    
            const base64WithPrefix = `data:image/jpeg;base64,${newPhoto.base64}`;
            const response = await validaImage(base64WithPrefix);
    
            await refreshLocation();
            
            if (!location) {
                Alert.alert(
                    'Localização necessária',
                    'Por favor, habilite a localização para realizar a busca por produtos próximos.'
                );
                return;
            }
    
            let textoFiltro = ""
            const keys = response.nome.split(" ");
            if (keys.length > 4) {
                textoFiltro = `${keys[0]} ${keys[1]} ${keys[2]} ${keys[3]}`
            } else {
                textoFiltro = response.nome
            }

            const filtro = {
                texto: textoFiltro,
                ordem: "",
                categoria: ""
            }

            try {
                const responseProduct = await searchProduct(filtro, location)

                if (!responseProduct || responseProduct.length === 0) {
                    // Produto não encontrado, cadastrar produto
                    response.foto = base64WithPrefix;
                    router.push({
                        pathname: '/createProduct',
                        params: { 
                            product: JSON.stringify(response),
                            key: Date.now().toString()
                        }
                    })
                    return;
                }

                router.push({
                    pathname: '/search',
                    params: { 
                        product: JSON.stringify(responseProduct),
                        key: Date.now().toString(),
                        search: filtro.texto,
                    }
                })
            } catch (error) {
                response.foto = base64WithPrefix;
                router.push({
                    pathname: '/createProduct',
                    params: { 
                        product: JSON.stringify(response),
                        key: Date.now().toString()
                    }
                })
            }
        } catch (error) {
            console.log("Erro ao tirar ou processar a foto:", error);
            Alert.alert('Erro', 'Não foi possível processar a imagem.');
        } finally {
            setIsLoading(false);
        }

    }

    const scanner = (e) => {
        setBarcodeValue(e.data)
    }

    const searchProductByBarcode = async (barcode) => {
        setIsLoading(true);

        try {
            const response = await getProductByBarcode(barcode)
    
            router.push({ pathname: '/search', params: {
                product: JSON.stringify(response)
            } })

            setIsLoading(false);

        } catch (error) {
            console.log(error)
            setIsLoading(false);
            Alert.alert('Erro', 'Não foi possível buscar o produto pelo código de barras.');
        }

        return null;
    }

    useEffect(() => {
        if (barcodeValue) {
            searchProductByBarcode(barcodeValue)


            // router.replace({
            //     pathname: '/camera',
            //     params: {
            //         id: barcodeValue
            //     }
            // })
        }
    }, [barcodeValue])

    return (
        <>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={colors.white} />
                </View>
            )}

            <View style={styles.header}>
                <BackButton 
                    accessibilityHint="Pressione para voltar"
                    onPress={() => router.back()}
                    color={colors.white}
                />
            </View>

            {barcodeMode ? (
                <View style={styles.container}>
                    <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        enableTorch={false}
                        mode="picture"
                        barcodeScannerSettings={{
                            barcodeTypes: ['aztec', 'codabar', 'code128', 'code39', 'code93', 'ean8', 'ean13', 'upc_a', 'upc_e'],
                        }}
                        onBarcodeScanned={(e) => scanner(e)}
                    >
                        <View style={styles.buttonContainer}>
                            <View style={{ width: 32 }}></View>
        
                            <TouchableOpacity style={styles.barcode_button} onPress={() => setBarcodeMode(false)}>
                                <MaterialCommunityIcons name="barcode-scan" size={80} color={colors.white} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.picture_button_2} onPress={() => setBarcodeMode(false)}>
                                <View style={styles.button_inside_2}></View>
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                    <View style={styles.delimiter_start}></View>
                    <View style={styles.scanner}></View>
                    <View style={styles.delimiter_end}></View>
                </View>
                
            ) : (
                <View style={styles.container}>
                    <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        enableTorch={false}
                        mode="picture"
                    >
                        <View style={styles.buttonContainer}>
                            <View style={{ width: 32 }}></View>

                            <TouchableOpacity
                                style={styles.picture_button}
                                onPress={takePic}
                                disabled={isLoading}
                            >
                                <View style={styles.button_inside}></View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.barcode_button} onPress={() => setBarcodeMode(true)}>
                                <MaterialCommunityIcons name="barcode-scan" size={32} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                </View>

            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
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
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
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
    },
    header: {
        position: 'absolute',
        marginTop: 48,
        left: 16,
        zIndex: 10,
        backgroundColor: 'transparent'
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CameraSearch
