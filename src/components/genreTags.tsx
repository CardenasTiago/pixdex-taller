import { View, Text, StyleSheet } from 'react-native';
import { TextPressStart2P } from "./font";
import { Colors } from "@/src/constants/Colors";

type GenreTagsProps = {
  genres: string[];
};

export const GenreTags = ({ genres }: GenreTagsProps) => {
  if (genres.length === 0) return null;

  return (
    <View style={styles.container}>
      {genres.map((genre, index) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.tagText}>{genre.toUpperCase()}</Text>
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
  tag: {
    backgroundColor: Colors.grisOscuro,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  tagText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default GenreTags;