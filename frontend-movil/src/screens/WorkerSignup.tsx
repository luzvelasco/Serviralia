import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../navigation/Header";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

export default function WorkerSignup() {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <Text style={styles.text}>
                    Serviralia para trabajadores en móvil proximamente
                </Text>
                <Image
                    source={{
                        uri: 'https://em-content.zobj.net/source/microsoft-teams/337/slightly-smiling-face_1f642.png'
                    }}
                    style={styles.logo} />
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Login')}>
                    <Text
                        style={styles.backText}>
                        Regresar a Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        paddingVertical: 25,
        paddingHorizontal: 25,
        justifyContent: 'center'
    },
    text: {
        fontSize: 25,
        fontFamily: 'Inter_400Regular',
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf: 'center',
    },
    backText: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'Inter_400Regular',
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf: 'center',
    },
    backButton: {
        marginTop: 15,
        padding: 10,
        width: '50%',
        backgroundColor: '#2A5C8C',
        borderRadius: 5,
        alignSelf: 'center'
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginVertical: 30,
        alignSelf: 'center'
    },
})