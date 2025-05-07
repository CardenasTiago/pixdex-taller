// src/components/CardScroll.tsx
import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { Card } from "@/src/components/cards";
import { contenidosAudiovisuales } from "@/src/data/contenidoAudiovisual";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { TextPressStart2P } from "@/src/components/font";

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768 && width < 1024;
const isXLargeDevice = width >= 1024;

type CardScrollProps = {
  tipoId: number;
};

export const CardScroll = ({ tipoId }: CardScrollProps) => {
  const data = contenidosAudiovisuales.filter(item => item.tipoId === tipoId);
  const tipo = tiposContenidoAudiovisual.find(t => t.id === tipoId);
  const title = tipo ? tipo.plural.toUpperCase() : '';

  return (
    <View style={styles.audiovisuales}>
      <View style={styles.categoriaSerieContainer}>
        <View style={styles.categoria}>
          <TextPressStart2P style={styles.serieText}>{title}</TextPressStart2P>
        </View>
      </View>
      <View style={styles.borde}>
        <FlatList
          horizontal
          data={data}
          renderItem={({ item }) => (
            <Card 
              id={item.id}
              title={item.nombre} 
              tags={item.generos.map(genId => {
                const genero = generosContenidoAudiovisual.find(g => g.id === genId);
                return genero ? genero.nombre : '';
              }).filter(Boolean)} 
              description={item.descripcion}
              imageUrl={item.imageUrl}
            />
          )}
          keyExtractor={(item) => `${tipoId}-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  audiovisuales: {
    width: '100%',
    marginBottom: 20,
  },

  categoriaSerieContainer: {
    paddingHorizontal: 20,
    marginBottom: -15,
    zIndex: 1,
  },

  categoria: {
    backgroundColor: "#6E59A5",
    borderWidth: 2,
    borderColor: "#9B87F5",
    height: isSmallDevice ? 30 : isMediumDevice ? 32 : 34,
    justifyContent: "center",
    alignSelf: 'flex-start',
    padding: 5
  },

  serieText: {
    color: "white",
    fontSize: isSmallDevice ? 10 : isMediumDevice ? 11 : 12,
    textAlign: "center",
    paddingVertical: 4,
  },

  borde: {
    borderColor: "#403E43",
    borderWidth: 4,
    height: isSmallDevice ? 250 : isMediumDevice ? 400 : isLargeDevice ? 500 : 500,
    marginHorizontal: 10,
    paddingTop: 20,
  },

  horizontalScrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
});

export default CardScroll;