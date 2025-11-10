import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../navigation/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCardList from "../components/ProfileCardList";
import { useEffect, useState } from "react";
import { API_URL } from "../types/navigation";
import { Profile } from "../types/profile";

const skills = [
    { id: '1', name: 'Plomería', image: require('../../assets/skills/Plomeria.png') },
    { id: '2', name: 'Electricidad', image: require('../../assets/skills/Electricidad.png') },
    { id: '3', name: 'Limpieza', image: require('../../assets/skills/Limpieza.png') },
    { id: '4', name: 'Mecánica', image: require('../../assets/skills/Mecanica.png') },
    { id: '5', name: 'Construcción', image: require('../../assets/skills/Construccion.png') },
    { id: '6', name: 'Otros', image: require('../../assets/skills/Otros.png') },
];

const SkillsGrid = ({ skill, onPress }: any) => {

    // asigna color diferente botones de skills
    let backgroundColor;
    switch (skill.id) {
        case '1': backgroundColor = '#CAEBFF'; break;
        case '2': backgroundColor = '#FFECAC'; break;
        case '3': backgroundColor = '#FEE4E8'; break;
        case '4': backgroundColor = '#FFEDE0'; break;
        case '5': backgroundColor = '#DFD3D3'; break;
        case '6': backgroundColor = '#E9E8E8'; break;
        default: backgroundColor = '#F0F0F0';
    }

    // pone la información de los skills en los botones
    return (
        <TouchableOpacity
            style={[styles.gridItem, { backgroundColor: backgroundColor }]}
            onPress={() => onPress(skill.name)}
            activeOpacity={0.7}
        >
            <Image source={skill.image} style={styles.gridItemImage} />
            <Text style={styles.gridItemText}>{skill.name}</Text>
        </TouchableOpacity>
    )
}

export default function Home() {

    const URL = API_URL + '/user/SearchSkill/all';

    const [isLoading, setIsLoading] = useState(true);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [error, setError] = useState<string | null>(null);

useEffect(() => {
        const loadProfiles = async () => {
            try {
                setError(null);
                const response = await fetch('http://localhost:3003/user/SearchSkill/null');

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: no se pudo conectar con la api`);
                }

                const responsejson: any = await response.json();
                if (!responsejson.success) {
                    setError('¡Vaya! Ocurrió un error')
                }

                setProfiles(responsejson.data.slice(0, 5));
            } catch (err: any) {
                console.log(err.message);
                setError('¡Vaya! Ocurrió un error')
            }
        };

        loadProfiles();
    }, []);

    // const profiles = [
    //     {
    //         id_worker: 1,
    //         fullName: "Benjamín Barona",
    //         pfpFileName: "Benjamin.jpg",
    //         gallery: [
    //             "1WorkerGallery.jpg",
    //             "1WorkerGallery2.jpg"
    //         ],
    //         rating: "5.0",
    //         totalReviews: 1,
    //         skills: [
    //             "Plomería"
    //         ],
    //         score: "11.000000000"
    //     },
    //     {
    //         id_worker: 2,
    //         fullName: "Roberto Castillo",
    //         pfpFileName: "Roberto.jpg",
    //         gallery: [
    //             "2WorkerGallery.jpg"
    //         ],
    //         rating: "5.0",
    //         totalReviews: 1,
    //         skills: [
    //             "Plomería"
    //         ],
    //         score: "11.000000000"
    //     },
    //     {
    //         id_worker: 6,
    //         fullName: "Jerónimo Gálvez",
    //         pfpFileName: "Jeronimo.jpg",
    //         gallery: [
    //             "6WorkerGallery.jpg",
    //             "6WorkerGallery2.jpg"
    //         ],
    //         rating: "5.0",
    //         totalReviews: 1,
    //         skills: [
    //             "Electricidad",
    //             "Construcción"
    //         ],
    //         score: "11.000000000"
    //     }
    // ]

    // para simular la selección de skill
    const handleSkillSelection = (categoryName: string) => {
        console.log(`Skill seleccionada: ${categoryName}`);
    };

    return (
        // <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.scroll}>
                <View style={styles.content}>
                    <Text
                        style={styles.title} >
                        ¿Qué buscas?
                    </Text>
                    {/* hace la cuadricula con la lista de skills */}
                    <FlatList
                        data={skills}
                        renderItem={({ item }) => (
                            <SkillsGrid skill={item} onPress={handleSkillSelection} />
                        )}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        scrollEnabled={false}
                    />

                    <Text
                        style={styles.title} >
                        Recomendados
                    </Text>
                    
                    {/* <ProfileCardList Profiles={profiles}/> */}
                    {error ? 
                    <Text style={styles.errorMessage}>{error}</Text>
                    : <ProfileCardList Profiles={profiles} />}
                </View>
            </ScrollView>
        </View>
        // </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        paddingBottom: 40
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '400',
        marginTop: 10,
        marginBottom: 22,
        color: 'black',
    },
    row: {
        justifyContent: 'space-between', // espacio igual entre columnas
        marginBottom: 24,
    },
    gridItem: {
        height: 120,
        width: 156,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    gridItemImage: {
        width: 62,
        height: 62,
        marginBottom: 8,
        resizeMode: 'contain',
    },
    gridItemText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
    },
    errorMessage:{
        fontSize:20,
        color: 'red'
    }
})

