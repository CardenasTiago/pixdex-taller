import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { Navbar } from "@/src/components/navbar";          // ← Mayúscula + prop
import { GameCard } from "@/src/components/games";
import { CardScroll } from "@/src/components/cardsScroll";
import { Colors } from "@/src/constants/Colors";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";

export function HomeScreen() {
  const handleFilterPress = () => {
    console.log("Abrir modal de filtros");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* NAVBAR con prop onFilterPress */}
        <Navbar onFilterPress={handleFilterPress} />

        {/* JUEGOS */}
        <View style={styles.gamesRow}>
          <GameCard
            title="Desafío del Ahorcado"
            description="Adivina los títulos letra por letra. ¿Cuántos puedes identificar?"
            color="purple"
          />
          <GameCard
            title="Pixel Reveal"
            description="Identifica títulos desde imágenes pixeladas. ¡Pon a prueba tu memoria visual!"
            color="green"
          />
        </View>
        {tiposContenidoAudiovisual.map((tipo) => (
          <CardScroll key={tipo.id} tipoId={tipo.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  gamesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
});
