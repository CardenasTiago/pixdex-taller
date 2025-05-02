import {StyleSheet, Text, View, ActivityIndicator, ScrollView, Platform, Dimensions } from "react-native";
import { useFonts } from 'expo-font';
import { Navbar } from "@/src/components/navbar";
import { AnimeCard } from "@/src/components/cards";

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768 && width < 1024;
const isXLargeDevice = width >= 1024;

export default function Index() {
  const [fontsLoaded] = useFonts({
    'PressStart2P': require('../src/assets/fonts/PressStart2P-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#fff" />;
  }
  
  // Datos de las series de anime
  const animeSeries = [
    { title: "Fullnetal Alch...", tags: ["Action", "Adventure"] },
    { title: "AttackCutter", tags: ["Action", "Sci-Fi"] },
    { title: "DeathNate", tags: ["Mystery", "Thriller"] },
    { title: "Fullnetal Alch...", tags: ["Action", "Adventure"] },
    { title: "Attack on Titan", tags: ["Action", "Drama"] },
    { title: "Death Note", tags: ["Mystery", "Thriller"] }
  ];

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>     
        <View style={styles.navbarContainer}>
            <Navbar/>
        </View>
      
        <View style={styles.mainContent}>
          {/* Game Boxes */}
          <View style={styles.boxContainer}>
            <View style={styles.gameBox}>
              <View style={styles.purpleBox}>
                <View style={styles.contentContainer}>
                  <Text style={styles.gameTitle}>
                    {isSmallDevice ? "Desafío\nAhorcado" : "Desafío del\nAhorcado"}
                  </Text>
                  <Text style={styles.gameDescription}>
                    Adivina los títulos letra por letra. ¿Cuántos puedes identificar?
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <Text style={styles.playText}>Jugar</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.gameBox}>
              <View style={styles.greenBox}>
                <View style={styles.contentContainer}>
                  <Text style={styles.gameTitle}>Pixel Reveal</Text>
                  <Text style={styles.gameDescription}>
                    Identifica títulos desde imágenes pixeladas.¡Pon a prueba tu memoria visual!
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <Text style={styles.playText}>Jugar</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Sección de Series con Scroll Horizontal CORREGIDA */}
          <View style={styles.audiovisuales}>
            <View style={styles.categoriaSerieContainer}>
              <View style={styles.categoria}>
                  <Text style={styles.serieText}>ANIME</Text>
              </View>
            </View>
            <View style={styles.borde}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollContent}
              >
                 {animeSeries.map((series, index) => (
                    <AnimeCard key={index} title={series.title} tags={series.tags} />
                  ))}
              </ScrollView>
            </View>
          </View>
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
    borderTopColor: "#8F77CD",
    borderLeftColor: "#8F77CD",
    borderRightColor: "#4A3D70",
    borderBottomColor: "#4A3D70",
    height: isSmallDevice ? 130 : isMediumDevice ? 140 : isLargeDevice ? 160 : 200,
    position: "relative",
  },
  
  greenBox: {
    backgroundColor: "#4CAF50",
    padding: isSmallDevice ? 8 : isMediumDevice ? 10 : isLargeDevice ? 12 : 14,
    borderWidth: 3,
    borderTopColor: "#6ECF70",
    borderLeftColor: "#6ECF70",
    borderRightColor: "#2E8B30",
    borderBottomColor: "#2E8B30",
    height: isSmallDevice ? 130 : isMediumDevice ? 140 : isLargeDevice ? 160 : 200,
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
    fontSize: isSmallDevice ? 12 : isMediumDevice ? 14 : isLargeDevice ? 22 : 24,
    fontFamily: "PressStart2P",
    marginBottom: isSmallDevice ? 4 : isMediumDevice ? 6 : 8,
    lineHeight: isSmallDevice ? 16 : isMediumDevice ? 18 : 28,
  },
  
  gameDescription: {
    color: "white",
    fontSize: isSmallDevice ? 10 : isMediumDevice ? 12 : isLargeDevice ? 18 : 20,
    lineHeight: isSmallDevice ? 13 : isMediumDevice ? 16 : 18,
  },
  
  playText: {
    color: "white",
    fontFamily: "PressStart2P",
    fontSize: isSmallDevice ? 9 : isMediumDevice ? 11 : 15,
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
    width: 100,
    height: isSmallDevice ? 28 : isMediumDevice ? 30 : 32,
    justifyContent: "center",
    alignSelf: 'flex-start',
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