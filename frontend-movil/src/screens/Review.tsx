import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { API_URL, ReviewScreenRouteProp, RootStackParamList } from "../types/navigation";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import PrettyStars from "../components/PrettyStars";

const SKILL_MAP: { [key: string]: number } = {

    'Plomería': 1,
    'Electricidad': 2,
    'Limpieza': 3,
    'Mecánica': 4,
    'Construcción': 5,
    'Otros': 6,
};

const SKILLS = Object.keys(SKILL_MAP);
const MOCK_CLIENT_ID = 1;

export default function Review() {

    const route = useRoute<ReviewScreenRouteProp>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { workerId, workerSkills } = route.params;

    const [availableSkills, setAvailableSkills] = useState<string[]>([]);
    const [selectedSkill, setSelectedSkill] = useState<string>(SKILLS[0]);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (workerSkills && workerSkills.length > 0) {
            const filteredSkills = workerSkills.filter(skill => SKILL_MAP.hasOwnProperty(skill));

            setAvailableSkills(filteredSkills);

            // Establecer la primera habilidad como seleccionada por defecto
            if (filteredSkills.length > 0) {
                setSelectedSkill(filteredSkills[0]);
            }
        }
    }, [workerSkills]);

    const handleAttachPhoto = () => {
        // placeholder
        if (photos.length < 2) {
            setPhotos([...photos, `https://placehold.co/100x100/A0A0A0/FFFFFF?text=Foto ${photos.length + 1}`]);
        } else {
            Alert.alert("Límite de fotos", "Solo puedes adjuntar hasta 2 fotos.");
        }
    };

    const handleRemovePhoto = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const handleSubmitReview = async () => {
        // validación
        if (rating === 0) {
            console.log("Valoración requerida", "Por favor, selecciona al menos una estrella.");
            Alert.alert("Valoración requerida", "Por favor, selecciona al menos una estrella.");
            return;
        }
        if (comment.trim().length < 10) {
            console.log("Comentario requerido", "Por favor, escribe un comentario más detallado (mínimo 10 caracteres).");
            Alert.alert("Comentario requerido", "Por favor, escribe un comentario más detallado (mínimo 10 caracteres).");
            return;
        }

        setIsSubmitting(true);

        const skillId = SKILL_MAP[selectedSkill];

        const formData = new FormData();

        formData.append('id_worker', workerId.toString());
        formData.append('id_client', MOCK_CLIENT_ID.toString());
        formData.append('rating', rating.toString());
        formData.append('review', comment.trim());
        formData.append('skill', skillId.toString());

        photos.forEach((photoUrl) => {
            formData.append('gallery[]', photoUrl);
        });

        const URL = API_URL + 'user/review';

        try {
            console.log("Enviando Reseña:", formData);

            const response = await fetch(URL, {
                method: 'POST',
                body: formData as any,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText || 'Error desconocido'}`);
            }

            console.log("Reseña Enviada", "¡Gracias! Tu reseña se ha publicado con éxito.");
            Alert.alert("Reseña Enviada", "¡Gracias! Tu reseña se ha publicado con éxito.");

            // Navegar de vuelta al perfil del trabajador
            navigation.goBack();

        } catch (error: any) {
            console.error("Error al enviar la reseña:", error.message);
            Alert.alert("Error de Envío", `No se pudo enviar la reseña: ${error.message}.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (availableSkills.length === 0) {
        return (
            <View style={[styles.container, styles.centerMessage]}>
                <Text style={styles.noSkillsText}>Este trabajador no tiene habilidades asignadas para ser reseñadas.</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <View style={styles.header}>
                <ScrollView
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.title}>
                        Escribir reseña
                    </Text>

                    {/* --- SKILL PICKER --- */}

                    <Text style={styles.label}>Categoría</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedSkill}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedSkill(itemValue)}
                            itemStyle={styles.pickerItem}
                        >
                            {availableSkills.map((skill) => (
                                <Picker.Item key={skill} label={skill} value={skill} />
                            ))}
                        </Picker>
                    </View>

                    {/* --- 2. RATING --- */}

                    <Text style={styles.label}>
                        Valoración
                    </Text>
                    <View style={styles.ratingContainer}>
                        <PrettyStars rating={rating} onRate={setRating} isEditable={true} />
                    </View>

                    {/* --- 3. REVIEW --- */}

                    <Text style={styles.label}>
                        Comentario
                    </Text>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Describe tu experiencia con el servicio: ¿Qué te gustó? ¿El resultado cumplió con tus expectativas?"
                        multiline={true}
                        numberOfLines={4}
                        value={comment}
                        onChangeText={setComment}
                        editable={!isSubmitting}
                    />

                    {/* --- 4. ATTACH PICS --- */}

                    <View style={styles.photoSection}>
                        <TouchableOpacity
                            style={styles.attachButton}
                            onPress={handleAttachPhoto}
                            disabled={isSubmitting || photos.length >= 2}
                        >
                            {/* emoji por ahora */}
                            <Text style={styles.attachButtonIcon}>
                                📎
                            </Text>
                            <Text style={styles.attachButtonText}>
                                Adjuntar foto
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.photoPreviewContainer}>
                            {photos.map((uri, index) => (
                                <View key={index} style={styles.photoWrapper}>
                                    <Image
                                        source={{ uri: uri }}
                                        style={styles.photoThumbnail} />
                                    <TouchableOpacity
                                        style={styles.removePhoto}
                                        onPress={() => handleRemovePhoto(index)}
                                        disabled={isSubmitting}
                                    >
                                        <Text style={styles.removePhotoText}>
                                            X
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                            {/* placeholder en caso de foto vacía (si hay menos de 2) */}
                            {photos.length < 2 && (
                                <View style={styles.photoPlaceholder} />
                            )}
                        </View>
                    </View>

                    {/* --- 5. SEND --- */}

                    <TouchableOpacity
                        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                        onPress={handleSubmitReview}
                        disabled={isSubmitting}
                    >
                        <Text style={styles.submitButtonText}>
                            {isSubmitting ? 'Enviando...' : 'Enviar'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 25,
        paddingVertical: 40
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Inter_500Medium'
    },
    label: {
        fontSize: 13,
        color: 'black',
        marginTop: 15,
        marginBottom: 5,
        fontFamily: 'Inter_400Regular'
    },

    // --- Picker ---
    pickerContainer: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        // borderWidth: 1,
        // borderColor: '#E0E0E0',
    },
    picker: {
        height: 45,
        width: '100%',
        color: '#333',
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        paddingHorizontal: 10,
    },
    // IOS
    pickerItem: {
        height: 35,
        color: 'black',
        fontFamily: 'Inter_400Regular',
        fontSize: 14
    },

    // --- Rating ---
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },

    // --- Comment Input ---
    commentInput: {
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 15,
        fontSize: 14,
        height: 120,
        textAlignVertical: 'top',
        color: '#333',
        fontFamily: 'Inter_400Regular'
    },

    // --- Photo Section ---
    photoSection: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 20,
        marginBottom: 30,
    },
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

    photoPreviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    photoWrapper: {
        position: 'relative',
        marginRight: 10,
    },
    photoThumbnail: {
        width: 70,
        height: 70,
        borderRadius: 8,
        backgroundColor: '#E0E0E0',
    },
    removePhoto: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#D9534F',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removePhotoText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Inter_400Regular'
    },
    photoPlaceholder: {
        width: 70,
        height: 70,
        borderRadius: 8,
        backgroundColor: '#D0D0D0',
        borderWidth: 1,
        borderColor: '#C0C0C0',
    },

    // --- Submit Button ---
    submitButton: {
        backgroundColor: '#2A5C8C',
        borderRadius: 8,
        paddingVertical: 15,
        width: '40%',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    submitButtonDisabled: {
        backgroundColor: '#A0B0C0',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Inter_400Regular'
    },
    centerMessage: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    noSkillsText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
})