// src/components/AnimeCard.tsx
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768 && width < 1024;

type AnimeCardProps = {
  title: string;
  tags: string[];
};

export const AnimeCard = ({ title, tags }: AnimeCardProps) => {
  return (
    <View style={styles.animeCardHorizontal}>
      <View style={styles.imageContainerHorizontal}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>{title}</Text>
        </View>
      </View>
      <View style={styles.cardContentContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tagPill}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    animeCardHorizontal: {
        width: isSmallDevice ? 160 : isMediumDevice ? 170 : isLargeDevice ? 190 : 180,
        height: '100%', // Ocupa toda la altura disponible
        marginRight: isSmallDevice ? 12 : 15,
        backgroundColor: '#1F2430',
        borderWidth: 2,
        borderColor: '#2A2F3B',
        overflow: 'hidden',
      },
    
      imageContainerHorizontal: {
        width: '100%',
        height: '70%', // 70% del espacio para la imagen
        backgroundColor: '#232323',
      },
      imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#A9A9A9',
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      placeholderText: {
        color: '#333',
        fontSize: isSmallDevice ? 12 : 14,
        textAlign: 'center',
        paddingHorizontal: 5,
      },
      cardContentContainer: {
        height: '30%', // 30% del espacio para el contenido
        padding: isSmallDevice ? 6 : 8,
        backgroundColor: '#1A1F2C',
        justifyContent: 'space-between', // Distribuye el espacio entre título y tags
      },
    
      cardTitleContainer: {
        padding: isSmallDevice ? 6 : 8,
        backgroundColor: '#1A1F2C',
      },
    
      cardTitle: {
        color: 'white',
        fontFamily: 'PressStart2P',
        fontSize: isSmallDevice ? 8: 12,
        marginBottom: 8,
      },
    
      tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    
      tagPill: {
        backgroundColor: '#363636',
        paddingVertical: 3,
        paddingHorizontal: isSmallDevice ? 6 : 8,
        borderRadius: 4,
        marginRight: 5,
        marginBottom: 4,
      },
    
      tagText: {
        color: 'white',
        fontSize: isSmallDevice ? 8 : 10,
      },
});
