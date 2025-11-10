import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { API_URL } from "../types/navigation";

interface Profile {
    id_worker: number;
    fullName: string;
    pfpFileName: string; // image path
    gallery: string[]; // array de galeria
    rating: string;
    totalReviews: number;
    skills: string[]; // array de skills
    score: string;
}


export default function ProfileCardList({ Profiles }: { Profiles: Profile[] }) {
    // console.log(API_URL);
    

    console.log(Profiles); // This prints the list fine


    const RenderCard = ({ item }: any) => (
        <View>

            <Image
                source={{uri: API_URL + '/images/'}}
                style={styles.workerIcon}
            />
            <Text>{item.fullName}</Text>
            <Text>5.0 ⭐⭐⭐⭐⭐ 85 reseñas</Text>

        </View>
    );


    return (
        <FlatList
            data={Profiles}
            renderItem={({ item }) => <RenderCard item={item} />}
            keyExtractor={(item) => item.id_worker.toString()}
        />
    )
}

const styles = StyleSheet.create({
    workerIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 10,
    }
})