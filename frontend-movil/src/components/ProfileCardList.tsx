import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { API_URL } from "../types/navigation";
import PrettyStars from './PrettyStars';
import { Profile } from '../types/profile';


export default function ProfileCardList({ Profiles }: { Profiles: Profile[] }) {
    // console.log(API_URL);


    console.log(Profiles); // This prints the list fine


    const RenderCard = ({ item }: any) => (
        <View style={styles.cardContainer}>

            <View style={styles.cardHeader}>
                <Image
                    source={{ uri: API_URL + '/images/' + item.pfpFileName }}
                    style={styles.workerIcon}
                />


                <View style={styles.cardInfo}>
                    <Text style={styles.name}>
                        {item.fullName}</Text>

                    <View style={styles.reviewContainer}>
                        <Text style={styles.review}>{item.rating}</Text>

                        <PrettyStars rating={item.rating} />

                        <Text style={styles.review}>
                            {item.totalReviews}
                            {item.totalReviews === 1 ? ' reseña' : ' reseñas'}
                        </Text>
                    </View>

                    <FlatList
                        horizontal
                        data={item.skills}
                        renderItem={({ item }) => <Text style={styles.skill}>{item}</Text>}
                        keyExtractor={(skill, index) => index.toString()}
                    />
                </View>
            </View>

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
    cardContainer: {
        padding: 20,
        borderRadius: 15,
        marginBottom: 30,
        marginHorizontal: 7,
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        // Sombra para Android
        elevation: 5,
        width: '100%',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    workerIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 10,
    },
    cardInfo: {

    },
    name: {
        fontSize: 18,
        paddingBottom: 5


    },
    review: {
        fontSize: 16,
        paddingBottom: 6,
        marginHorizontal:5
    },
    reviewContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    skill: {
        // height: 29,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        color: 'white',
        backgroundColor: '#333333',
        marginRight: 10
    }


})