import { useRoute } from "@react-navigation/native";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { API_URL, SearchProps } from "../types/navigation";
import { useEffect, useState } from "react";
import { Profile } from "../types/profile";
import ProfileCardList from "../components/ProfileCardList";

interface Skill {
    id_skill: number;
    skill_name: string;
}

export default function Search() {

    const route = useRoute<SearchProps>();
    const { skillId } = route.params;

    const [isLoadingProfiles, setIsLoadingProfiles] = useState(true);
    const [isLoadingSkillName, setIsLoadingSkillName] = useState(true);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [skillName, setSkillName] = useState('skill seleccionada');

    useEffect(() => {

        const fetchSkillName = async () => {
            try {
                setIsLoadingSkillName(true);
                const response = await fetch(API_URL + 'user/skills');

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: no se pudo obtener la lista de skills.`);
                }

                const responsejson: { success: boolean, data: Skill[] } = await response.json();

                if (responsejson.success && responsejson.data) {
                    // busca el name por id 
                    const selectedSkill = responsejson.data.find(s => s.id_skill === skillId);

                    if (selectedSkill) {
                        setSkillName(selectedSkill.skill_name);
                    } else {
                        // id no en la lista
                        setSkillName(`ID desconocido (${skillId})`);
                    }
                }
            } catch (err: any) {
                console.error("Error al obtener el nombre de la skill:", err);
                setSkillName(`Error al cargar nombre (ID: ${skillId})`);
            } finally {
                setIsLoadingSkillName(false);
            }
        };

        fetchSkillName();
    }, [skillId]);

    useEffect(() => {
        const URL = API_URL + 'user/SearchSkill/' + skillId;

        const loadProfiles = async () => {
            try {
                setIsLoadingProfiles(true);
                setError(null);

                const response = await fetch(URL)

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: no se pudo buscar los perfiles`);
                }

                const responsejson: any = await response.json();

                if (!responsejson.success) {
                    setError('¡Vaya! Ocurrió un error')
                    setProfiles([]) // limpiar lista de perfiles en caso de error
                }

                setProfiles(responsejson.data);
            } catch (err: any) {
                console.log(err.message);
                setError('¡Vaya! Ocurrió un error')
            } finally {
                setIsLoadingProfiles(false);
            }
        }
        loadProfiles();
    }, []);

    if (isLoadingProfiles || isLoadingSkillName) {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <ActivityIndicator size="large" color="#2A5C8C" />
                    <Text>
                        Cargando perfiles...
                    </Text>
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>

                <Image
                    style={{ width: '100%', height: 150 }}
                    source={{ uri: API_URL + '/backgrounds/' + skillId + '.png' }}
                />
                <Text style={styles.title}>
                    {skillName}
                </Text>

                {error ?
                    <Text style={styles.errorMessage}>
                        {error}
                    </Text> : <ProfileCardList Profiles={profiles} />
                }
            </ScrollView>
        </View>
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
        // paddingHorizontal: 30,
        paddingTop: 16,
    },
    title: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 22,
        color: 'black',
    },
    errorMessage: {
        fontSize: 18,
        padding: 20,
        color: 'red'
    }
})