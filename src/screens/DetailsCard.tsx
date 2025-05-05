// src/screens/DetailsCard.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { TextPressStart2P } from "@/src/components/font";
import { contenidosAudiovisuales } from "@/src/data/contenidoAudiovisual";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { Ionicons } from '@expo/vector-icons';

type DetailsCardProps = {
    cardId: number;
};

export const DetailsCard = ({ cardId }: DetailsCardProps) => {
  const contenido = contenidosAudiovisuales.find(item => item.id === cardId);
  if (!contenido) {
    return (
      <SafeAreaView style={styles.container}>
        <TextPressStart2P style={styles.errorText}>Contenido no encontrado</TextPressStart2P>
      </SafeAreaView>
    );
  }
  const tipoContenido = tiposContenidoAudiovisual.find(t => t.id === contenido.tipoId);
  const generos = contenido.generos.map(genId => {
    return generosContenidoAudiovisual.find(g => g.id === genId)?.nombre || '';
  }).filter(Boolean);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <View style={styles.backContent}>
                <Ionicons name="arrow-back" size={16} color="white" />
                <TextPressStart2P style={styles.backText}>BACK</TextPressStart2P>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {/* Imagen */}
          <View style={styles.imageContainer}>
            {contenido.imageUrl ? (
              <Image 
                source={{ uri: contenido.imageUrl }} 
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <TextPressStart2P style={styles.placeholderText}>
                  {contenido.nombre}
                </TextPressStart2P>
              </View>
            )}
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.titleContainer}>
              <TextPressStart2P style={styles.title}>
                {contenido.nombre}
              </TextPressStart2P>
            </View>

            <View style={styles.section}>
                {tipoContenido && (
                    <View style={styles.genresContainer}>
                        <View style={styles.genreBadge}>
                            <Text style={styles.typeText}>
                                {tipoContenido.singular.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                )}
              <Text style={styles.description}>{contenido.descripcion}</Text>
            </View>

            {generos.length > 0 && (
              <View style={styles.section}>
                <TextPressStart2P style={styles.sectionTitle}>Geners</TextPressStart2P>
                <View style={styles.genresContainer}>
                  {generos.map((genero, index) => (
                    <View key={index} style={styles.genreBadge}>
                      <Text style={styles.genreText}>{genero.toUpperCase()}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1F2C',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF5555',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  backButton: {
    backgroundColor: '#6E59A5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    lineHeight: 16,
    position: 'relative',
    top: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 2/3,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#2A2F3B',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#403E43',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
  },
  infoContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  title: {
    color: '#9B87F5',
    fontSize: 18,
    marginRight: 10,
    flexShrink: 1,
  },
  typeBadge: {
    backgroundColor: '#6E59A5',
    borderWidth: 2,
    borderColor: '#9B87F5',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  typeText: {
    color: 'white',
    fontSize: 13,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#4ADE80',
    fontSize: 12,
    marginBottom: 8,
  },
  description: {
    color: '#E2E8F0',
    fontSize: 14,
    lineHeight: 20,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  genreBadge: {
    backgroundColor: '#2D3748',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default DetailsCard;