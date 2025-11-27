import React, { useState } from 'react';
import { Button, Alert, TouchableOpacity, Text, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import { launchImageLibrary, ImagePickerResponse, ImageLibraryOptions } from 'react-native-image-picker';

const ImagePicker: React.FC = () => {

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const showPermissionContext = () => {
        if (Platform.OS !== 'web') {
            Alert.alert(
                "¡Necesitas subir fotos!",
                "Para adjuntar imágenes a tu reseña, necesitamos permiso para acceder a tu galería. Por favor, acepta en el siguiente paso.",
                [
                    {
                        text: "Cancelar",
                        style: "cancel"
                    },
                    {
                        text: "Entendido",
                        onPress: openImagePicker
                    }
                ],
                { cancelable: false }
            );
        }

    };


    const openImagePicker = async () => {
        // --- 1. SOLICITUD DE PERMISOS PARA ANDROID ---
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    {
                        title: "Permiso de Galería",
                        message: "Necesitamos acceso a tus fotos para que puedas adjuntarlas a la reseña.",
                        buttonNeutral: "Preguntar Después",
                        buttonNegative: "Cancelar",
                        buttonPositive: "Aceptar"
                    }
                );

                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Permiso de galería denegado");
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }

        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
            selectionLimit: 1,
        };

        // En iOS, esta llamada dispara el diálogo de permiso nativo la primera vez.
        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('Image picker error: ', response.errorMessage);
                Alert.alert('Error', `Ocurrió un error: ${response.errorMessage}`);
            } else if (response.assets && response.assets.length > 0) {
                const imageUri = response.assets[0].uri;
                if (imageUri) {
                    setSelectedImage(imageUri);
                }
            }
        });
    }

    return (
        <TouchableOpacity
            onPress={openImagePicker}
            style={styles.attachButton}
        >
            <Text style={styles.attachButtonIcon}>
                📎
            </Text>
            <Text style={styles.attachButtonText}>
                Adjuntar foto
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    attachButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFC107',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginRight: 10,
    },
    attachButtonIcon: {
        fontSize: 18,
        marginRight: 5,
    },
    attachButtonText: {
        color: 'black',
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    },
})

export default ImagePicker;