import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function FAQ() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContent}>
                <View style={styles.qContainer}>
                    <Text style={styles.title}>
                        FAQ
                    </Text>

                    <Text style={styles.question}>
                        ¿El registro como trabajador o cliente es gratis?
                    </Text>
                    <Text style={styles.answer}>
                        Sí, el registro de ambas cuentas no tiene costo.
                    </Text>
                    <Text style={styles.question}>
                        ¿Cómo me comunico con los trabajadores desde la aplicación?
                    </Text>
                    <Text style={styles.answer}>
                        Desde el sitio web se puede mandar un formulario de contacto y el trabajador lo recibe junto con el número de teléfono y correo vinculados a la cuenta.
                    </Text>
                    <Text style={styles.question}>
                        ¿Las cuentas de trabajador y de cliente son diferentes?
                    </Text>
                    <Text style={styles.answer}>
                        Sí. La cuenta de trabajador tiene un perfil que otros usuarios pueden visualizar. La cuenta de cliente puede enviar formualrios y reseñas.
                    </Text>
                </View>
                <View style={styles.aboutContainer}>
                    <Text style={styles.title}>
                        Sobre nosotros
                    </Text>
                    <Text style={styles.answer}>
                        En Serviralia hacemos fácil encontrar profesionales de mantenimiento para tu hogar.
                        Contrata electricistas, plomeros, pintores y más con solo unos clics, revisando su experiencia
                        y opiniones de clientes anteriores. Si eres trabajador, muestra tus habilidades, destaca tus
                        proyectos y consigue más oportunidades de trabajo. ¡La solución ideal para hogares y expertos en Cancún!
                        {'\n'}
                        {'\n'}
                        SERVIRALIA MÓVIL PARA TRABAJADORES PRONTO.
                    </Text>
                    <Text style={styles.title}>
                        Información de contacto
                    </Text>
                    <Text style={styles.answer}>
                        serviralia.mx@gmail.com
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContent: {
        paddingHorizontal: 30,
        paddingTop: 0,
    },
    qContainer: {
        paddingTop: 20
    },
    aboutContainer: {
        paddingTop: 5,
        paddingBottom: 20,
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Inter_500Medium',
        marginTop: 10,
        marginBottom: 5,
    },
    question: {
        fontSize: 15,
        color: 'black',
        marginTop: 15,
        marginBottom: 5,
        fontFamily: 'Inter_500Medium'
    },
    answer: {
        fontSize: 15,
        color: 'black',
        marginTop: 5,
        marginBottom: 5,
        fontFamily: 'Inter_400Regular'
    },
})