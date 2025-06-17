import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { Navbar } from "@/src/components/navbar";          // ← Mayúscula + prop
import { GameCard } from "@/src/components/games";
import { CardScroll } from "@/src/components/cardsScroll";
import { Colors } from "@/src/constants/Colors";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";

export function HomeScreen() {
  /** Acción al pulsar FILTRAR (ajústalo a lo que necesites) */
  const handleFilterPress = () => {
    console.log("Abrir modal de filtros");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
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

        {/* LISTAS DINÁMICAS */}
        {tiposContenidoAudiovisual.map((tipo) => (
          <CardScroll key={tipo.id} tipoId={tipo.id} />
        ))}
      </SafeAreaView>
    </ScrollView>
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
