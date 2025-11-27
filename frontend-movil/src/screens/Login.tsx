import { useState, useContext } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL, LoginProps } from "../types/navigation";
import { UserContext } from "../../App";

export default function Login({ navigation }: LoginProps) {
    const URL = API_URL + 'login';

    const { setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        if (rememberMe) { // Hack para pasar iniciar sesion
            navigation.replace('MainTabs');
            return;
        }

        if (!email || !password) {
            Alert.alert("Inicia sesión", "Por favor, introduce tu correo y contraseña.");
            return;
        }

        console.log(`Intentando iniciar sesión con Email: ${email} y Contraseña: ${password}`);

        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            // console.log(response.body);
            const data = await response.json()
            // console.log(data);

            if (!data.success) {
                Alert.alert(data.message, data.error);
                console.log(data.message, ":", data.error);
                return;
            }

            console.log(data.data);
            setUser(data.data)
            navigation.replace('MainTabs');
            return;




        } catch (error: any) {
            console.error("Error al iniciar sesión:", error.error);
            Alert.alert("Error de Envío", `No se pudo iniciar sesión: ${error.error}.`);

        }


    };

    const handleClientSignup = () => {
        navigation.navigate('ClientSignup');
    };

    const handleWorkerSignup = () => {
        navigation.navigate('WorkerSignup');
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/Logo imagen.png')}
                />

                <Text style={styles.title}>
                    Iniciar Sesión
                </Text>

                {/* -------------------- INPUTS -------------------- */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.inputEmail]}
                        placeholder="Correo electrónico"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    >
                    </TextInput>
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    >
                    </TextInput>
                </View>

                {/* -------------------- BOTONES -------------------- */}
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={styles.rememberMe}
                        onPress={() => setRememberMe(!rememberMe)}>
                        <View style={[styles.checkbox, { backgroundColor: rememberMe ? '#2A5C8C' : '#D9D9D9' }]} />
                        <Text style={styles.rememberMeText}>
                            Recuérdame
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                // disabled={isSubmitting}
                >
                    <Text style={styles.loginButtonText}>
                        Entrar
                    </Text>
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>
                        O crear una cuenta

                    </Text>
                    <View style={styles.dividerLine} />
                </View>
                <View style={styles.roleButtonContainer}>
                    <TouchableOpacity
                        style={styles.roleButton}
                        onPress={handleClientSignup}
                    >
                        <Text style={styles.roleButtonText}>
                            Cliente

                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.roleButton}
                        onPress={handleWorkerSignup}>
                        <Text style={styles.roleButtonText}>
                            Trabajador
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        color: '#000',
        fontWeight: '400',
        marginBottom: 20,
        fontFamily: 'Inter_400Regular'
    },
    inputContainer: {
        width: 275,
        height: 94,
        borderColor: '#BEBEBE',
        borderWidth: 1,
        borderRadius: 0
    },
    input: {
        height: 47, // La mitad de la altura del contenedor (94 / 2)
        paddingHorizontal: 10,
        fontSize: 15,
        fontFamily: 'Inter_400Regular'
    },
    inputEmail: {
        borderBottomWidth: 1, // La línea que separa los dos campos
        borderColor: '#BEBEBE',
    },
    optionsContainer: {
        flexDirection: 'row', // Pone los elementos en una fila
        justifyContent: 'space-between', // Empuja los elementos a los extremos
        alignItems: 'center',
        width: 275,
        marginTop: 20,
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 15,
        height: 15,
        borderWidth: 1,
        borderColor: '#636363',
        borderRadius: 5,
    },
    rememberMeText: {
        marginLeft: 8,
        fontFamily: 'Inter_400Regular'
    },
    loginButton: {
        backgroundColor: '#2A5C8C',
        width: 275,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Inter_400Regular'
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: 275,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
    },
    dividerText: {
        marginHorizontal: 10,
        color: 'black',
        fontFamily: 'Inter_400Regular'
    },
    roleButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 275,
        marginTop: 20,
    },
    roleButton: {
        backgroundColor: '#FFC107',
        width: 125,
        height: 45,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    roleButtonText: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'normal',
        fontFamily: 'Inter_400Regular'
    },
});