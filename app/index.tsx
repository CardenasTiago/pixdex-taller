import {StyleSheet, Text, View, ActivityIndicator, ScrollView, Platform, Dimensions } from "react-native";
import { useFonts } from 'expo-font';
import { Navbar } from "@/src/components/navbar";

// Obtener dimensiones del dispositivo con breakpoints detallados
const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;  // Teléfonos pequeños
const isMediumDevice = width >= 375 && width < 768; // Teléfonos normales/tablets pequeñas
const isLargeDevice = width >= 768 && width < 1024; // Tablets grandes
const isXLargeDevice = width >= 1024; // PCs y pantallas grandes

export default function Index() {
  const [fontsLoaded] = useFonts({
    'PressStart2P': require('../src/assets/fonts/PressStart2P-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#fff" />;
  }
  
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>     
        {/* Navbar */}
        <View>
            <Navbar/>
        </View>
      
        {/* Game Boxes */}
        <View style={styles.boxContainer}>
          {/* Purple Game Box */}
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
          
          {/* Green Game Box */}
          <View style={styles.gameBox}>
            <View style={styles.greenBox}>
              <View style={styles.contentContainer}>
                <Text style={styles.gameTitle}>Pixel Reveal</Text>
                <Text style={styles.gameDescription}>
                  Identifica títulos desde imágenes pixeladas.¡Pon a prueba tu memoria visual!
                  {(isMediumDevice || isXLargeDevice)}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.playText}>Jugar</Text>
              </View>
            </View>
          </View>

        </View>

        <View>
            <View style={styles.categoriaSerie}>
                <Text style={styles.serieText} >SERIES</Text>
            </View>
            <View style={styles.borde}>
                <ScrollView>
                    <View>
                        
                    </View>
                </ScrollView>
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
    paddingHorizontal: isXLargeDevice ? width * 0.1 : 12,
  },
  
  boxContainer: {
    flexDirection: "row",
    flexWrap: isXLargeDevice ? 'wrap' : 'nowrap',
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 3,
    maxWidth: isXLargeDevice ? 1200 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  
  gameBox: {
    width: isXLargeDevice ? "45%" : "48.5%",
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
    fontSize: isSmallDevice ? 12 : isMediumDevice ? 14 : isLargeDevice ? 25 : 18,
    fontFamily: "PressStart2P",
    marginBottom: isSmallDevice ? 4 : isMediumDevice ? 6 : 8,
    lineHeight: isSmallDevice ? 16 : isMediumDevice ? 18 : 28,
  },
  
  gameDescription: {
    color: "white",
    fontSize: isSmallDevice ? 10 : isMediumDevice ? 15 : isLargeDevice ? 21 : 16,
    lineHeight: isSmallDevice ? 13 : isMediumDevice ? 16 : 18,
  },
  
  playText: {
    color: "white",
    fontFamily: "PressStart2P",
    fontSize: isSmallDevice ? 9 : isMediumDevice ? 11 : 17,
  },

  categoriaSerie:{
    backgroundColor: "#6E59A5",
    borderWidth: 2,
    borderColor:"#9B87F5",
    fontWeight: 700,
    width: 100,
    height: 30,
    marginTop: 10,
    marginLeft: 20,
    justifyContent: "center"
  },

  serieText:{
    color: "white",
    fontSize: isSmallDevice ? 10 : isMediumDevice ? 11 : isLargeDevice ? 12: 16,
    fontFamily: "PressStart2P",
    alignSelf: "center",
  },

  borde:{
    borderColor: "#403E43",
    borderWidth: 4,
    height: "50%",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  cajas:{
    borderWidth: 2,
    borderRightColor:"#9B87F5",
    borderBottomColor:"#9B87F5",
    borderLeftColor:"#4A3D70",
    borderTopColor:"#4A3D70"
  }
  
});