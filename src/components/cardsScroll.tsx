import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card } from "@/src/components/cards";
import { contenidosAudiovisuales } from "@/src/data/contenidoAudiovisual";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { TextPressStart2P } from "@/src/components/font";
import {Colors} from "@/src/constants/Colors";

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
          <TextPressStart2P style={styles.categoriaText}>{title}</TextPressStart2P>
        </View>
      </View>
      <View style={styles.borde}>
      <FlatList
          horizontal
          data={data}
          renderItem={({ item }) => (
            <Card id={item.id} />
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
    backgroundColor: Colors.purpura,
    borderWidth: 2,
    borderColor: Colors.purpuraClaro,
    height: 32,
    justifyContent: "center",
    alignSelf: 'flex-start',
    padding: 5
  },

  categoriaText: {
    color: "white",
    fontSize: 11,
    textAlign: "center",
    paddingVertical: 4,
  },

  borde: {
    borderColor: Colors.grisOscuro,
    borderWidth: 4,
    height: 400, 
    marginHorizontal: 10,
    paddingTop: 20,
  },

  horizontalScrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
});

export default CardScroll;