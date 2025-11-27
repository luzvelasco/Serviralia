import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

interface PrettyStarsProps {
    rating: number; 
    size?: number; 
    isEditable?: boolean; 
    onRate?: (newRating: number) => void; 
}

const PrettyStars: React.FC<PrettyStarsProps> = ({ 
    rating, 
    size = 20, 
    isEditable = false, 
    onRate 
}) => {
    const maxStars = 5;
    const ratingNum = Math.floor(rating);
    const hasHalfStar = rating - ratingNum >= 0.5;
   
    const renderStar = (index: number) => {
        const starValue = index + 1; // 1, 2, 3, 4, 5
        

        let iconName: 'star' | 'star-half' | 'star-outline';
        
        if (starValue <= ratingNum) {
            iconName = 'star'; 
        } else if (hasHalfStar && starValue === ratingNum + 1) {
            iconName = 'star-half'; 
        } else {
            iconName = 'star-outline'; 
        }

        const clickRating = starValue;

        const content = (
            <Ionicons 
                name={iconName} 
                size={size} 
                color="#FFC107"
                style={styles.starIcon}
            />
        );

        if (isEditable && onRate) {
            return (
                <TouchableOpacity 
                    key={index} 
                    onPress={() => onRate(clickRating)}
                    style={styles.touchableArea}
                    accessibilityLabel={`Dar ${clickRating} estrellas`}
                >
                    {content}
                </TouchableOpacity>
            );
        }

        return <View key={index}>{content}</View>;
    };

    return (
        <View style={styles.container}>
            {Array.from({ length: maxStars }).map((_, index) => renderStar(index))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    touchableArea: {
        paddingHorizontal: 2, // Pequeño padding para aumentar el área de toque
    },
    starIcon: {
        paddingHorizontal: 2
    }
});

export default PrettyStars;