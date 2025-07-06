import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Href, router } from 'expo-router';
import { TextPressStart2P } from "@/src/components/font";
import { ROUTES } from '@/src/navegation/routes';
import { Image } from 'expo-image';
import { Colors } from "@/src/constants/constants";
import { GenreTags } from "@/src/components/genreTags";
import { contenidosAudiovisuales } from '@/src/data/contenidoAudiovisual';
import { generosContenidoAudiovisual } from '@/src/data/generosContenidoAudiovisual';

type CardProps = {
  id: number;
};

export const Card = ({ id }: CardProps) => {
  const contenido = contenidosAudiovisuales.find(item => item.id === id);
  if (!contenido) return null;

  const generos = contenido.generos
    .map(genId => generosContenidoAudiovisual.find(g => g.id === genId)?.nombre)
    .filter(Boolean) as string[];

  const handlePress = () => {
    router.push(`${ROUTES.DETAIL}${id}` as Href);
  };

  return (
    <TouchableOpacity 
      style={styles.CardHorizontal} 
      onPress={handlePress}
    >
      <View style={styles.imageContainerHorizontal}>
        <Image 
          source={{ uri: contenido.imageUrl }} 
          style={styles.image}
          contentFit="cover"
        />
      </View>
      <View style={styles.cardContentContainer}>
        <TextPressStart2P style={styles.cardTitle}>{contenido.nombre}</TextPressStart2P>
        <GenreTags genres={generos} compact /> 
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
    borderLeftColor: Colors.purpuraOscuro,
    borderRightColor: Colors.purpuraClaro,
    borderTopColor: Colors.purpuraOscuro,
    borderBottomColor: Colors.purpuraClaro,
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
  
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Card;