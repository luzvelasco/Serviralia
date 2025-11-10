import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Profile {
    id: number;
    name: string;
    rating: number;
    reviews: number;
    icon: string; // image path
    skills: string[]; // array de skills
    gallery: string[]; // array de galeria
}

interface ProfileProps {
  profileId: number;
}