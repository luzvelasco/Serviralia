import { Image, StyleSheet, Text, View } from "react-native";
import Header from "../navigation/Header";

export default function WorkerSignup() {
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
                    style={styles.logo}/>
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
    logo: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginVertical: 30,
        alignSelf: 'center'
    },
})