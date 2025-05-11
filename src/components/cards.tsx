// src/components/Card.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Href, router } from 'expo-router';
import { TextPressStart2P } from "@/src/components/font";
import { ROUTES } from '@/src/navegation/routes';
import { Image } from 'expo-image';
import {Colors} from "@/src/constants/Colors";

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
          <Image 
            source={{uri: imageUrl}} 
            style={styles.image}
            contentFit="cover" // Corregido: usar contentFit en lugar de resizeMode
          />
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
    width: 170, 
    height: '100%',
    marginRight: 15,
    backgroundColor: Colors.fondo,
    borderWidth: 2,
    borderColor: Colors.grisOscuro,
    overflow: 'hidden',
  },
  
  imageContainerHorizontal: {
    width: '100%',
    height: '70%',
    backgroundColor: Colors.grisOscuro,
  },
  
  cardContentContainer: {
    height: '30%',
    padding: 8,
    backgroundColor: Colors.fondo,
    justifyContent: 'space-between',
  },
  
  cardTitle: {
    color: 'white',
    fontFamily: 'PressStart2P',
    fontSize: 12, 
    marginBottom: 8,
  },
  
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  tagPill: {
    backgroundColor: Colors.grisOscuro,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 4,
  },
  
  tagText: {
    color: 'white',
    fontSize: 10, 
    fontWeight: 'bold',
  },

  image: {
    width: '100%',
    height: '100%',
  },
});

export default Card;