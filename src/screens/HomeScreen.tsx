import { StyleSheet, ScrollView, View, SafeAreaView, Modal, Pressable, Text} from "react-native";
import { Navbar } from "@/src/components/navbar";       
import { GameCard } from "@/src/components/games";
import { CardScroll } from "@/src/components/cardsScroll";
import { Colors } from "@/src/constants/Colors";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import React, { useState } from "react";
import { FilterModal } from "../components/filter";

export function HomeScreen() {


  const [filterVisible, setFilterVisible] = useState(false);

  const handleApplyFilters = (filters: any) => {
    console.log("Filtros aplicados:", filters);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* NAVBAR con prop onFilterPress */}
        <Navbar onFilterPress={() => setFilterVisible(true)} />
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={handleApplyFilters}
      />

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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: Colors.grisOscuro,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    color: Colors.purpuraClaro,
    marginBottom: 12,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: Colors.purpura,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
