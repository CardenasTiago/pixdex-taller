import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { Navbar } from "@/src/components/navbar";       
import { GameCard } from "@/src/components/games";
import { CardScroll } from "@/src/components/cardsScroll";
import { Colors } from "@/src/constants/Colors";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import React, { useState } from "react";
import { FilterModal } from "../components/filter";
import { contenidosAudiovisuales } from "@/src/data/contenidoAudiovisual";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";

export function HomeScreen() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    contentTypes: tiposContenidoAudiovisual.reduce((acc, tipo) => {
      acc[tipo.id] = true;
      return acc;
    }, {} as Record<number, boolean>),
    genres: generosContenidoAudiovisual.reduce((acc, genero) => {
      acc[genero.id] = false;
      return acc;
    }, {} as Record<number, boolean>),
  });

  const handleApplyFilters = (filters: {
    contentTypes: Record<number, boolean>;
    genres: Record<number, boolean>;
  }) => {
    setActiveFilters(filters);
  };

  const filteredContentTypes = tiposContenidoAudiovisual.filter(
    tipo => activeFilters.contentTypes[tipo.id]
  );

  const filterByGenres = (items: typeof contenidosAudiovisuales) => {
    const selectedGenres = Object.entries(activeFilters.genres)
      .filter(([_, selected]) => selected)
      .map(([id]) => parseInt(id));

    if (selectedGenres.length === 0) return items;

    return items.filter(item => 
      item.generos.some(genreId => selectedGenres.includes(genreId))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Navbar onFilterPress={() => setFilterVisible(true)} />
        
        <FilterModal
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          onApply={handleApplyFilters}
          initialFilters={activeFilters}
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

        {/* Mostrar solo los tipos de contenido seleccionados */}
        {filteredContentTypes.map((tipo) => (
          <CardScroll 
            key={tipo.id} 
            tipoId={tipo.id} 
            filterFunction={filterByGenres}
          />
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