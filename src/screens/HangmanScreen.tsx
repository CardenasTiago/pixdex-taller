import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TextPressStart2P } from "@/src/components/font";
import { Colors } from "@/src/constants/Colors";

// Datos del leaderboard
const topPlayers = [
  { name: 'PixelMaster', score: 12 },
  { name: 'NinjaGamer', score: 10 },
  { name: 'MediaGuru', score: 8 },
  { name: 'TVFanatic', score: 7 },
  { name: 'AnimeWizard', score: 5 },
];

export function HangmanScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  const handleStartGame = () => {
    // Aquí puedes navegar a la pantalla del juego real
    // router.push('/hangman/game');
    console.log('Iniciar juego de ahorcado');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con botón de regreso */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <TextPressStart2P style={styles.backText}>BACK</TextPressStart2P>
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        {/* Título del juego */}
        <View style={styles.titleContainer}>
          <TextPressStart2P style={styles.gameTitle}>
            Hangman{'\n'}Challenge
          </TextPressStart2P>
        </View>

        {/* Descripción */}
        <Text style={styles.description}>
          Guess the titles of popular TV shows, movies, and anime one letter at a time. 
          You have 5 lives - can you get the highest score?
        </Text>

        {/* Botón de inicio */}
        <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
          <TextPressStart2P style={styles.startButtonText}>
            START GAME
          </TextPressStart2P>
        </TouchableOpacity>

        {/* Leaderboard */}
        <View style={styles.leaderboardContainer}>
          <TextPressStart2P style={styles.leaderboardTitle}>
            Top Players
          </TextPressStart2P>
          
          <View style={styles.playersList}>
            {topPlayers.map((player, index) => (
              <View key={index} style={styles.playerRow}>
                <Text style={styles.playerRank}>{index + 1}.</Text>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerScore}>{player.score}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.purpura,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: Colors.purpuraOscuro,
    alignSelf: 'flex-start',
  },
  backText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  gameTitle: {
    color: Colors.purpura,
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 32,
  },
  description: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  startButton: {
    backgroundColor: Colors.purpura,
    borderWidth: 3,
    borderColor: Colors.purpuraOscuro,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginBottom: 40,
  },
  startButtonText: {
    color: 'white',
    fontSize: 14,
  },
  leaderboardContainer: {
    flex: 1,
  },
  leaderboardTitle: {
    color: Colors.verde,
    fontSize: 16,
    marginBottom: 20,
  },
  playersList: {
    backgroundColor: Colors.grisOscuro,
    borderWidth: 2,
    borderColor: Colors.gris,
    padding: 15,
    borderRadius: 8,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  playerRank: {
    color: 'white',
    fontSize: 14,
    width: 25,
  },
  playerName: {
    color: 'white',
    fontSize: 14,
    flex: 1,
    marginLeft: 10,
  },
  playerScore: {
    color: Colors.verde,
    fontSize: 14,
    fontWeight: 'bold',
  },
});