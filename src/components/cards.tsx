// src/components/Card.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Href, router } from 'expo-router';
import { TextPressStart2P } from "@/src/components/font";
import { ROUTES } from '@/src/navegation/routes';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768 && width < 1024;

type CardProps = {
  id: number;
  title: string;
  tags: string[];
  description: string;  
  imageUrl: string;
};

export const Card = ({ id, title, tags, description, imageUrl }: CardProps) => {
  const handlePress = () => {
    router.push(`${ROUTES.DETAIL}${id.toString()}` as Href);
};

  return (
    <TouchableOpacity 
      style={styles.CardHorizontal} 
      onPress={handlePress}
      activeOpacity={0.5}
    >
      <View style={styles.imageContainerHorizontal}>
          <Image source={{uri: imageUrl}} style={styles.image}/>
          
      </View>
      <View style={styles.cardContentContainer}>
        <TextPressStart2P style={styles.cardTitle}>{title}</TextPressStart2P>
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tagPill}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    CardHorizontal: {
        width: isSmallDevice ? 160 : isMediumDevice ? 170 : isLargeDevice ? 190 : 180,
        height: '100%', // Ocupa toda la altura disponible
        marginRight: isSmallDevice ? 12 : 15,
        backgroundColor: '#1F2430',
        borderWidth: 2,
        borderColor: '#2A2F3B',
        overflow: 'hidden',
      },
    
      imageContainerHorizontal: {
        width: '100%',
        height: '70%', // 70% del espacio para la imagen
        backgroundColor: '#232323',
      },
      imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#A9A9A9',
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      placeholderText: {
        color: '#333',
        fontSize: isSmallDevice ? 12 : 14,
        textAlign: 'center',
        paddingHorizontal: 5,
      },
      cardContentContainer: {
        height: '30%', // 30% del espacio para el contenido
        padding: isSmallDevice ? 6 : 8,
        backgroundColor: '#1A1F2C',
        justifyContent: 'space-between', // Distribuye el espacio entre título y tags
      },
    
      cardTitleContainer: {
        padding: isSmallDevice ? 6 : 8,
        backgroundColor: '#1A1F2C',
      },
    
      cardTitle: {
        color: 'white',
        fontFamily: 'PressStart2P',
        fontSize: isSmallDevice ? 8: 12,
        marginBottom: 8,
      },
    
      tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    
      tagPill: {
        backgroundColor: '#363636',
        paddingVertical: 3,
        paddingHorizontal: isSmallDevice ? 6 : 8,
        borderRadius: 4,
        marginRight: 5,
        marginBottom: 4,
      },
    
      tagText: {
        color: 'white',
        fontSize: isSmallDevice ? 8 : 10,
      },

      image: {
        width: '100%',
        height: '100%',
      },
});