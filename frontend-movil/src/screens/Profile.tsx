import { useState, useContext, useEffect } from "react";
import Header from "../navigation/Header";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { API_URL, ProfileProps, RootStackParamList } from "../types/navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { UserContext } from "../../App";


export default function Profile() {
    const URL = API_URL + 'edit/client';

    const { user } = useContext(UserContext);

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profilePhotoUri, setProfilePhotoUri] = useState('');

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const logData = () => {
        console.log("name:", name);
        console.log("lastName:", lastName);
        console.log("birthDate:", birthDate);
        console.log("email:", email);
        console.log("phone:", phone);
        console.log("profilePhotoUri:", profilePhotoUri);
    }

    const handleUpdate = async () => {
        const formData = new FormData();

        formData.append('userID', user.idUser.toString());
        formData.append('firstName', name);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('birthDate', birthDate.slice(0, 10));

        try {
            console.log("Actualizando usuario:", formData);

            const response = await fetch(URL, {
                method: 'PUT',
                body: formData as any,
            });

            if (!response.ok) {
                Alert.alert("Error", "Intente de nuevo");
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText || 'Error desconocido'}`);
            }

            Alert.alert("Actualizacion exitosa", "Se actualizaron correctamente");
            console.log("Actualizacion exitosa: Se actualizaron correctamente");

        } catch (error: any) {
            console.error("Error al enviar la reseña:", error.message);

            Alert.alert("Error", "Intente de nuevo");
        }
        // navigation.navigate('MainTabs');
    }

    const handleDelete = async () => {
        Alert.alert('¿Estas seguro?', 'Esta accion eliminará todos tus datos', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Eliminar', onPress: async () => {
                    console.log('OK Pressed')
                    deleteUser()
                },
                style: 'destructive',
            },
        ]);
    }

    const deleteUser = async () => {
        try {
            const deleteURL = API_URL + 'edit/' + user.idUser.toString()

            const response = await fetch(deleteURL, { method: 'DELETE' });

             if (!response.ok) {
                 Alert.alert("Error", "Intente de nuevo");
            }
        } catch (error) {

        }
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

    // Date
    const handleConfirm = (date: any) => {
        console.warn("A date has been picked: ", date);
        setBirthDate(date);
        hideDatePicker();
    };

    useEffect(() => {
        if (!user.idUser) {
            console.log("ALARMA ALARMALA DE TOS, UNO DOS TRES, PATADA Y TOS");

        }

        const loadUserInfo = async () => {
            try {
                const response = await fetch(URL + "/" + user.idUser.toString())

                if (!response.ok) {
                    Alert.alert("Error", "Intente de nuevo");
                }

                const data: any = await response.json();

                if (!data.success) {
                    Alert.alert("Error", "Intente de nuevo");
                    console.log(data.message, ":", data.error);
                    return;
                }

                // console.log("data:", data.data);

                setName(data.data.firstName);
                setLastName(data.data.lastName);
                setBirthDate(data.data.birthDate);
                setEmail(data.data.email);
                setPhone(data.data.phone.toString());
                // setProfilePhotoUri(data.data.pfpFileName);

            } catch (err: any) {
                console.log(err.message);
                Alert.alert("Error", "Intente de nuevo");
                // setError('¡Vaya! Ocurrió un error')
            }
        }
        console.log("User ID:", user.idUser);

        loadUserInfo();
        // logData();

    }, []);

    return (

        <View style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.title}>
                    Editar perfil
                </Text>

                {/* --- INPUTS --- */}

                <Text style={styles.label}>
                    Nombre(s)
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={name}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />

                <Text style={styles.label}>
                    Apellidos
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={lastName}
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
                        // placeholder={birthDate}
                        value={
                            new Date(birthDate)
                                .toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })
                        }
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
                    placeholder={email}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>
                    Número de teléfono
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={phone}
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
                    onPress={handleUpdate}
                >
                    <Text style={styles.signupButtonText}>
                        Guardar cambios
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDelete}
                >
                    <Text style={styles.signupButtonText}>
                        Eliminar cuenta
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
    deleteButton: {
        backgroundColor: '#e73535ff',
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