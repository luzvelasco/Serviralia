import { useState } from "react";
import { API_URL, ClientSignupProps } from "../types/navigation";
import Header from "../navigation/Header";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function ClientSignup({ navigation }: ClientSignupProps) {
    const URL = API_URL + 'signup/client';

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [profilePhotoUri, setProfilePhotoUri] = useState('');

    const handleSignup = async () => {
            const formData = new FormData();
    
            formData.append('firstName', name);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('birthDate', birthDate.slice(0, 10));
            formData.append('password', password);
    
            try {
                console.log("Registrando usuario:", formData);
    
                const response = await fetch(URL, {
                    method: 'POST',
                    body: formData as any,
                });
    
                if (!response.ok) {
                    Alert.alert("Error", "Intente de nuevo");
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText || 'Error desconocido'}`);
                }
    
                Alert.alert("Registro exitoso");
                console.log("Registro exitoso");
    
            } catch (error: any) {
                console.error("Error al enviar la reseña:", error.message);
    
                Alert.alert("Error", "Intente de nuevo");
            }
            navigation.navigate('Login');
        }

    const handleAttachPhoto = () => {
        // placeholder
        setProfilePhotoUri('https://placehold.co/100x100/AAAAAA/FFFFFF?text=Foto');
    };

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        console.warn("A date has been picked: ", date);
        setBirthDate(date);
        hideDatePicker();
    };

    return (

        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.title}>
                    Crear cuenta de cliente
                </Text>

                {/* --- INPUTS --- */}

                <Text style={styles.label}>
                    Nombre(s)
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe tu nombre(s)"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />

                <Text style={styles.label}>
                    Apellidos
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe tus apellidos"
                    value={lastName}
                    onChangeText={setLastName}
                    autoCapitalize="words"
                />

                <Text style={styles.label}>
                    Fecha de nacimiento
                </Text>
                <View style={styles.dateInputContainer}>
                    <TextInput
                        style={styles.dateInput}
                        placeholder="AAAA/MM/DD"
                        value={birthDate}
                        onChangeText={setBirthDate}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={styles.calendarButton}
                        onPress={showDatePicker}
                    >
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <Ionicons
                            name="calendar-outline"
                            size={24}
                            color="#FFF" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>
                    Correo electrónico
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="correo@dominio.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>
                    Contraseña
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Text style={styles.label}>
                    Número de teléfono
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="10 dígitos"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />

                {/* foto de perfil. rip. te dejo el mismo placeholder que en review */}
                <Text style={styles.label}>
                    Foto de perfil
                </Text>
                <TouchableOpacity
                    onPress={handleAttachPhoto}
                    style={styles.profilePhotoContainer} >
                    {profilePhotoUri ? (
                        <Image
                            source={{ uri: profilePhotoUri }}
                            style={styles.profilePhoto} />
                    ) : (
                        <Ionicons
                            name="person-circle-outline"
                            size={100}
                            color="#666" />
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={handleSignup}
                >
                    <Text style={styles.signupButtonText}>
                        Registrarse
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scroll: {
        paddingHorizontal: 28,
        paddingVertical: 20,
        paddingBottom: 50,
    },
    title: {
        fontSize: 20,
        color: 'black',
        marginTop: 15,
        fontFamily: 'Inter_500Medium'
    },

    // --- INPUTS ---
    label: {
        fontSize: 13,
        color: 'black',
        marginTop: 15,
        marginBottom: 8,
        fontFamily: 'Inter_400Regular'
    },
    input: {
        height: 35,
        borderColor: '#BEBEBE',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        fontSize: 12,
        color: '#333',
        fontFamily: 'Inter_400Regular'
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateInput: {
        flex: 1,
        height: 35,
        borderColor: '#BEBEBE',
        borderWidth: 1,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        paddingHorizontal: 15,
        fontSize: 12,
        color: '#333',
        fontFamily: 'Inter_400Regular'
    },
    calendarButton: {
        width: 35,
        height: 35,
        backgroundColor: '#BEBEBE', // Gris para el botón de calendario
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },

    // --- PFP ---
    profilePhotoContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#BEBEBE',
    },
    profilePhoto: {
        width: '100%',
        height: '100%',
    },

    // --- SIGNUP ---
    signupButton: {
        backgroundColor: '#2A5C8C',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30,
        width: '70%',
    },
    signupButtonText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Inter_400Regular'
    },
});