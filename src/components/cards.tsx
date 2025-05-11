// src/components/Card.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Href, router } from 'expo-router';
import { TextPressStart2P } from "@/src/components/font";
import { ROUTES } from '@/src/navegation/routes';
import { Image } from 'expo-image';

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
    width: 170, // Tamaño fijo para Android
    height: '100%',
    marginRight: 15,
    backgroundColor: '#1F2430',
    borderWidth: 2,
    borderColor: '#2A2F3B',
    overflow: 'hidden',
  },
  
  imageContainerHorizontal: {
    width: '100%',
    height: '70%',
    backgroundColor: '#232323',
  },
  
  cardContentContainer: {
    height: '30%',
    padding: 8,
    backgroundColor: '#1A1F2C',
    justifyContent: 'space-between',
  },
  
  cardTitle: {
    color: 'white',
    fontFamily: 'PressStart2P',
    fontSize: 12, // Tamaño fijo para Android
    marginBottom: 8,
  },
  
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  tagPill: {
    backgroundColor: '#363636',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 4,
  },
  
  tagText: {
    color: 'white',
    fontSize: 10, // Tamaño fijo para Android
  },

  image: {
    width: '100%',
    height: '100%',
  },
});