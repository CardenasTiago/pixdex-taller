import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { TextPressStart2P } from "@/src/components/font";
import { contenidosAudiovisuales } from "@/src/data/contenidoAudiovisual";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { BackButton } from "@/src/components/backButtom";
import { GenreTags } from "@/src/components/genreTags";
import { Image } from 'expo-image';
import { Colors } from "@/src/constants/Colors";

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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <BackButton />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: contenido.imageUrl }} 
              style={styles.image}
              contentFit="cover"
            />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.titleContainer}>
              <TextPressStart2P style={styles.title}>
                {contenido.nombre}
              </TextPressStart2P>
            </View>

            {tipoContenido && (
              <View style={styles.typeContainer}>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeText}>
                    {tipoContenido.singular.toUpperCase()}
                  </Text>
                </View>
              </View>
            )}

            <Text style={styles.description}>{contenido.descripcion}</Text>

            {generos.length > 0 && (
              <View style={styles.section}>
                <TextPressStart2P style={styles.sectionTitle}>GÉNEROS</TextPressStart2P>
                <GenreTags genres={generos} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  errorText: {
    color: '#FF5555',
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    backgroundColor: Colors.grisOscuro,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
  },
  titleContainer: {
    marginBottom: 12,
  },
  title: {
    color: Colors.purpuraClaro,
    fontSize: 18,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  typeLabel: {
    color: Colors.verde,
    fontSize: 12,
  },
  typeBadge: {
    backgroundColor: Colors.grisOscuro,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  typeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: Colors.verde,
    fontSize: 14,
    marginBottom: 12,
  },
  description: {
    color: '#E2E8F0',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
});

export default DetailsCard;