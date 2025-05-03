import {StyleSheet, Text, View, ActivityIndicator, ScrollView, Platform, Dimensions, FlatList } from "react-native";
import { useFonts } from 'expo-font';
import { Navbar } from "@/src/components/navbar";
import { Card } from "@/src/components/cards";
import { GameCard } from "@/src/components/games";
import { ContenidoAudiovisual, contenidosAudiovisuales } from "@/src/data/contenidoAudiovisual";
import { ITipoContenidoAudiovisual, tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768 && width < 1024;
const isXLargeDevice = width >= 1024;

export default function Index() {
  const [fontsLoaded] = useFonts({
    'PressStart2P': require('../src/assets/fonts/PressStart2P-Regular.ttf'),
  });

  const series = contenidosAudiovisuales.filter(item => item.tipoId === 1);
  const peliculas = contenidosAudiovisuales.filter(item => item.tipoId === 2);
  const animes = contenidosAudiovisuales.filter(item => item.tipoId === 3);

  const getTipoNombre = (tipoId: number) => {
    const tipo = tiposContenidoAudiovisual.find(t => t.id === tipoId);
    return tipo ? tipo.plural.toUpperCase() : '';
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  const renderSection = (data: ContenidoAudiovisual[], tipoId: number) => (
    <View style={styles.audiovisuales}>
      <View style={styles.categoriaSerieContainer}>
        <View style={styles.categoria}>
          <Text style={styles.serieText}>{getTipoNombre(tipoId)}</Text>
        </View>
      </View>
      <View style={styles.borde}>
        <FlatList
          horizontal
          data={data}
          renderItem={({ item }) => (
            <Card 
              title={item.nombre} 
              tags={item.generos.map(genId => {
                const genero = generosContenidoAudiovisual.find(g => g.id === genId);
                return genero ? genero.nombre : '';
              }).filter(Boolean)} 
              description={item.descripcion}
            />
          )}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        />
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>     
        <View style={styles.navbarContainer}>
          <Navbar/>
        </View>
      
        <View style={styles.mainContent}>
        <View style={styles.boxContainer}>
            <GameCard
              title={isSmallDevice ? "Desafío\nAhorcado" : "Desafío del\nAhorcado"}
              description="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?"
              color="purple"
            />
            <GameCard
              title="Pixel Reveal"
              description="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!"
              color="green"
            />
        </View>

          {/* Secciones de contenido */}
          {renderSection(series, 1)}
          {renderSection(peliculas, 2)}
          {renderSection(animes, 3)}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1F2C",
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
  
  mainContent: {
    width: '100%',
    maxWidth: isXLargeDevice ? 1280 : '100%',
    paddingHorizontal: isXLargeDevice ? 20 : 12,
  },
  
  navbarContainer: {
    width: '100%',
    marginBottom: 15,
  },
  
  boxContainer: {
    flexDirection: "row",
    flexWrap: isXLargeDevice ? 'wrap' : 'nowrap',
    justifyContent: "space-between",
    marginBottom: 15,
    width: '100%',
  },
  
  gameBox: {
    width: isXLargeDevice ? "48.5%" : "48.5%",
    marginBottom: isXLargeDevice ? 20 : 0,
  },
  
  purpleBox: {
    backgroundColor: "#6E59A5",
    padding: isSmallDevice ? 8 : isMediumDevice ? 10 : isLargeDevice ? 12 : 14,
    borderWidth: 3,
    borderColor: "#4A3D70",
    height: isSmallDevice ? 110 : isMediumDevice ? 120 : isLargeDevice ? 130 : 150,
    position: "relative",
  },
  
  greenBox: {
    backgroundColor: "#4CAF50",
    padding: isSmallDevice ? 8 : isMediumDevice ? 10 : isLargeDevice ? 12 : 14,
    borderWidth: 3,
    borderColor: "#4A3D70",
    height: isSmallDevice ? 100 : isMediumDevice ? 120 : isLargeDevice ? 130: 150,
    position: "relative",
  },
  
  contentContainer: {
    height: "80%",
  },
  
  buttonContainer: {
    position: "absolute",
    bottom: isSmallDevice ? 6 : isMediumDevice ? 8 : 10,
    right: isSmallDevice ? 8 : isMediumDevice ? 10 : 12,
  },
  
  gameTitle: {
    color: "white",
    fontSize: isSmallDevice ? 12 : isMediumDevice ? 14 : isLargeDevice ? 18 : 24,
    fontFamily: "PressStart2P",
    marginBottom: isSmallDevice ? 4 : isMediumDevice ? 6 : 8,
    lineHeight: isSmallDevice ? 16 : isMediumDevice ? 18 : 28,
  },
  
  gameDescription: {
    color: "white",
    fontSize: isSmallDevice ? 10 : isMediumDevice ? 12 : isLargeDevice ? 14 : 20,
    lineHeight: isSmallDevice ? 13 : isMediumDevice ? 16 : 18,
  },
  
  playText: {
    color: "white",
    fontFamily: "PressStart2P",
    fontSize: isSmallDevice ? 9 : isMediumDevice ? 11 : 13,
  },

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
    fontFamily: "PressStart2P",
    textAlign: "center",
    paddingVertical: 4,
  },

  borde: {
    borderColor: "#403E43",
    borderWidth: 4,
    height: isSmallDevice ? 250 : isMediumDevice ? 300 : isLargeDevice ? 400: 450,
    marginHorizontal: 10,
    paddingTop: 20,
  },

  horizontalScrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 15,
  },


});