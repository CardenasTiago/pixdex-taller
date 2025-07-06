import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { Navbar } from "@/src/components/navbar";       
import { GameCard } from "@/src/components/games";
import { CardScroll } from "@/src/components/cardsScroll";
import { Colors } from "@/src/constants/constants";
import React, { useState, useEffect } from "react";
import { FilterModal } from "../components/filter";
import { useContent } from "@/src/context/contentContext";

export function HomeScreen() {
  const { contenidos, tipos, generos} = useContent();
  
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    contentTypes: {} as Record<number, boolean>,
    genres: {} as Record<number, boolean>,
  });

  // Inicializar filtros cuando se cargan los datos
  useEffect(() => {
    if (tipos.length > 0 && generos.length > 0) {
      setActiveFilters({
        contentTypes: tipos.reduce((acc, tipo) => {
          acc[tipo.id] = true;
          return acc;
        }, {} as Record<number, boolean>),
        genres: generos.reduce((acc, genero) => {
          acc[genero.id] = false;
          return acc;
        }, {} as Record<number, boolean>),
      });
    }
  }, [tipos, generos]);

  const handleApplyFilters = (filters: {
    contentTypes: Record<number, boolean>;
    genres: Record<number, boolean>;
  }) => {
    setActiveFilters(filters);
  };

  const filteredContentTypes = tipos.filter(
    tipo => activeFilters.contentTypes[tipo.id]
  );

  const filterByGenres = (items: any[]) => {
    const selectedGenres = Object.entries(activeFilters.genres)
      .filter(([_, selected]) => selected)
      .map(([id]) => parseInt(id));

    if (selectedGenres.length === 0) return items;

    return items.filter(item => 
      item.generos && item.generos.some((genreId: number) => selectedGenres.includes(genreId))
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});