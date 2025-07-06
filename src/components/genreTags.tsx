import { View, Text, StyleSheet } from 'react-native';
import { TextPressStart2P } from "./font";
import { Colors } from "@/src/constants/constants";

type GenreTagsProps = {
    genres: string[];
    compact?: boolean;
  };
  
  export const GenreTags = ({ genres, compact = false }: GenreTagsProps) => {
    if (genres.length === 0) return null;
  
    return (
      <View style={[styles.container, compact && styles.compactContainer]}>
        {genres.map((genre, index) => (
          <View key={index} style={[styles.tag, compact && styles.compactTag]}>
            <Text style={[styles.tagText, compact && styles.compactTagText]}>{genre.toUpperCase()}</Text>
          </View>
        ))}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 16,
    },
    compactContainer: {
      gap: 4,
      marginBottom: 0,
    },
    tag: {
      backgroundColor: Colors.grisOscuro,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 4,
    },
    compactTag: {
      paddingVertical: 3,
      paddingHorizontal: 6,
    },
    tagText: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
    },
    compactTagText: {
      fontSize: 8,
    },
  });