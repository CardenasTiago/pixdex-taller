import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";
import {generosContenidoAudiovisual} from "@/src/data/generosContenidoAudiovisual"; 
import {tiposContenidoAudiovisual} from "@/src/data/tiposContenidoAudiovisual";
type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FiltersState) => void;
};

type FiltersState = {
  contentTypes: {
    [id: number]: boolean;
  };
  genres: {
    [id: number]: boolean;
  };
};

export const FilterModal = ({ visible, onClose, onApply }: FilterModalProps) => {
  const [filters, setFilters] = useState<FiltersState>({
    contentTypes: tiposContenidoAudiovisual.reduce((acc, tipo) => {
      acc[tipo.id] = true;
      return acc;
    }, {} as FiltersState["contentTypes"]),
    genres: generosContenidoAudiovisual.reduce((acc, genero) => {
      acc[genero.id] = false;
      return acc;
    }, {} as FiltersState["genres"]),
  });

  const toggleContentType = (id: number) => {
    setFilters(prev => ({
      ...prev,
      contentTypes: {
        ...prev.contentTypes,
        [id]: !prev.contentTypes[id],
      },
    }));
  };

  const toggleGenre = (id: number) => {
    setFilters(prev => ({
      ...prev,
      genres: {
        ...prev.genres,
        [id]: !prev.genres[id],
      },
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <SafeAreaView style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Filter Content</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={22} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 20 }}>
            <Text style={styles.sectionTitle}>Content Types</Text>
            {tiposContenidoAudiovisual.map((tipo) => (
              <TouchableOpacity
                key={tipo.id}
                style={styles.checkboxRow}
                onPress={() => toggleContentType(tipo.id)}
              >
                <View style={[styles.checkbox, filters.contentTypes[tipo.id] && styles.checkboxChecked]}>
                  {filters.contentTypes[tipo.id] && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>{tipo.plural}</Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Genres</Text>
            <View style={styles.genresContainer}>
              {generosContenidoAudiovisual.map((genero) => (
                <TouchableOpacity
                  key={genero.id}
                  style={styles.checkboxRowSmall}
                  onPress={() => toggleGenre(genero.id)}
                >
                  <View
                    style={[styles.checkbox, filters.genres[genero.id] && styles.checkboxChecked]}
                  >
                    {filters.genres[genero.id] && (
                      <Ionicons name="checkmark" size={14} color="white" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabelSmall}>{genero.nombre}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyText}>APPLY FILTERS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000AA",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    maxHeight: "80%",
    backgroundColor: "#111111",
    borderRadius: 8,
    padding: 16,
    borderWidth: 2,
    borderColor: "#444",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontFamily: "PressStart2P",
    fontSize: 14,
  },
  closeButton: {
    padding: 6,
  },
  scroll: {
    flexGrow: 0,
  },
  sectionTitle: {
    color: "#39FF14",
    fontFamily: "PressStart2P",
    fontSize: 12,
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  checkboxRowSmall: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#555",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#39FF14",
    borderColor: "#39FF14",
  },
  checkboxLabel: {
    color: "white",
    fontFamily: "PressStart2P",
    fontSize: 12,
  },
  checkboxLabelSmall: {
    color: "white",
    fontFamily: "PressStart2P",
    fontSize: 11,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: "#555",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  cancelText: {
    color: "white",
    fontFamily: "PressStart2P",
    fontSize: 12,
  },
  applyButton: {
    backgroundColor: "#6633FF",
    borderWidth: 2,
    borderColor: "#39FF14",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  applyText: {
    color: "white",
    fontFamily: "PressStart2P",
    fontSize: 12,
  },
});
