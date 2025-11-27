import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Review } from "../types/profile";
import PrettyStars from "./PrettyStars";
import { API_URL } from "../types/navigation";

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {

    const showImage = review.pfpFileName && review.pfpFileName.length > 0;

    const dateReview = (dateString: any) => {
        const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        let d = new Date(dateString);

        return month[d.getMonth()] + " " + d.getFullYear();

    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.header}>

                {showImage ? (
                    <Image
                        source={{ uri: API_URL + '/images/' + review.pfpFileName }}
                        style={styles.profileImage}
                        resizeMode="cover"
                        onError={(e) => console.log('Error al cargar icon:', e.nativeEvent.error)}
                    />
                ) : (
                    <View style={styles.iconPlaceholder}>
                        <Text style={styles.iconText}>
                            {review.username[0]}
                        </Text>
                    </View>
                )}

                <View style={styles.userInfo}>
                    <Text style={styles.reviewerName}>{
                        review.username}
                    </Text>
                    <Text style={styles.reviewDate}>
                        Publicado en {dateReview(review.date)}
                    </Text>
                </View>

                <View style={styles.skillContainer}>
                    <Text style={styles.skill}>
                        {review.skill}
                    </Text>
                </View>
            </View>

            <View style={styles.ratingAndComment}>
                <PrettyStars rating={review.rating} size={14} />
                <Text style={styles.comment}>
                    {review.review}

                </Text>
            </View>
            {/* --- GALERÍA DE IMÁGENES --- */}
            {review.gallery && review.gallery.length > 0 && (
                <View style={styles.galleryContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.galleryScroll}
                    >
                        {review.gallery.map((uri, index) => (
                            <Image
                                key={index}
                                source={{ uri: API_URL + '/images/' + uri }}
                                style={styles.galleryImage}
                                resizeMode="cover"
                                onError={() => console.log(`Error al cargar imagen: ${uri}`)}
                            />
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#DDD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    iconText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#DDD', // Por si la imagen tarda en cargar
    },
    userInfo: {
        flex: 1,
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Inter_400Regular',
    },
    reviewDate: {
        paddingTop: 5,
        fontSize: 12,
        color: '#4C4C4C',
        fontFamily: 'Inter_400Regular',
    },
    skillContainer: {
        alignSelf: 'flex-start',
    },
    skill: {
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        color: 'white',
        backgroundColor: '#333333',
        marginRight: 10,
        fontFamily: 'Inter_400Regular',
        fontSize: 13
    },
    ratingAndComment: {
        paddingLeft: 50,
    },
    comment: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: 'black',
        marginTop: 5,
        lineHeight: 20,
    },
    galleryContainer: {
        marginTop: 15,
        paddingLeft: 50,
    },
    galleryScroll: {
        // Estilos para el contenedor del scroll horizontal
    },
    galleryImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: '#E0E0E0',
    },
});