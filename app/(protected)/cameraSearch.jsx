import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors } from '../../assets/colors/global';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

const CameraSearch = () => {
    let cameraRef = useRef();
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState('');
    const [barcodeMode, setBarcodeMode] = useState(false)
    const [barcodeValue, setBarcodeValue] = useState('');

        

    
    useEffect(() => {
        if (permission) {
            if (!permission.granted) {
                requestPermission()
            }
        }
    }, [permission, permission])


    const takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        }

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto)

        console.log(newPhoto)
    }

    const scanner = (e) => {
        setBarcodeValue(e.data)
    }

    useEffect(() => {
        if (barcodeValue) {
            router.replace({
                pathname: '/camera',
                params: {
                    id: barcodeValue
                }
            })
        }
    }, [barcodeValue])


    return (
        <>
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

                            <TouchableOpacity style={styles.picture_button} onPress={takePic}>
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
    }
});

export default CameraSearch
