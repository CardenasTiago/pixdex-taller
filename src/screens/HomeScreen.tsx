import {StyleSheet, Text, View, ActivityIndicator, ScrollView, Platform, Dimensions, FlatList } from "react-native";
import { Navbar } from "@/src/components/navbar";
import { GameCard } from "@/src/components/games";
import { CardScroll } from "@/src/components/cardsScroll";
import {Colors} from "@/src/constants/Colors";
import {ROUTES} from "@/src/navegation/routes"

export function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>     
        <View style={styles.navbarContainer}>
          <Navbar/>
        </View>
      
        <View style={styles.mainContent}>
          <View style={styles.boxContainer}>
            <GameCard
              title={"Desafío del Ahorcado"}
              description="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?"
              color="purple"
            />
            <GameCard
              title="Pixel Reveal"
              description="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!"
              color="green"
            />
          </View>

          <CardScroll tipoId={1} />
          <CardScroll tipoId={2} />
          <CardScroll tipoId={3} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
  
  mainContent: {
    width: '100%',
    paddingHorizontal: 12,
  },
  
  navbarContainer: {
    width: '100%',
  },
  
  boxContainer: {
    flexDirection: "row",
    flexWrap: 'nowrap',
    justifyContent: "space-between",
    marginBottom: 15,
    width: '100%',
  },
  
  gameBox: {
    width: "48.5%",
  },
});