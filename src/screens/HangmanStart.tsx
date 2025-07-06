import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  Modal,
  TextInput,
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TextPressStart2P } from "@/src/components/font";
import { Colors } from "@/src/constants/Colors";
import { ROUTES } from '../navegation/routes';
import { useHangman } from '../context/hangmanContext';

const topPlayers = [
  { name: 'PixelMaster', score: 12 },
  { name: 'NinjaGamer', score: 10 },
  { name: 'MediaGuru', score: 8 },
  { name: 'TVFanatic', score: 7 },
  { name: 'AnimeWizard', score: 5 },
];

export function HangmanStart() {
  const router = useRouter();
  const [showNameModal, setShowNameModal] = useState(false);
  const { playerName, setPlayerName, resetGame } = useHangman();

  const handleBackPress = () => {
    router.back();
  };

  const handleStartGame = () => {
    resetGame();
    setShowNameModal(true);
  };

  const handleCloseModal = () => {
    setShowNameModal(false);
    setPlayerName('');
  };

  const handleStartWithName = () => {
    if (playerName.trim()) {
      setShowNameModal(false);
      router.push(ROUTES.HANGMANGAME);
    } else {
      Alert.alert('Error', 'Por favor ingresa tu nombre para continuar');
    }
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

      {/* Modal para ingresar nombre */}
      <Modal
        visible={showNameModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Botón de cerrar */}
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            
            {/* Título del modal */}
            <TextPressStart2P style={styles.modalTitle}>
              Enter Your Name
            </TextPressStart2P>
            
            {/* Campo de texto */}
            <TextInput
              style={styles.nameInput}
              placeholder="Nombre del jugador"
              placeholderTextColor="#999"
              value={playerName}
              onChangeText={setPlayerName}
              maxLength={20}
              autoFocus={true}
            />
            
            {/* Botón de inicio */}
            <TouchableOpacity style={styles.modalStartButton} onPress={handleStartWithName}>
              <TextPressStart2P style={styles.modalStartText}>
                START GAME
              </TextPressStart2P>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.fondo,
    borderWidth: 3,
    borderColor: Colors.purpura,
    borderRadius: 10,
    padding: 30,
    width: '85%',
    maxWidth: 400,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  nameInput: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.purpura,
    color: 'white',
    fontSize: 16,
    padding: 15,
    marginBottom: 30,
    borderRadius: 5,
  },
  modalStartButton: {
    backgroundColor: Colors.purpura,
    borderWidth: 3,
    borderColor: Colors.purpuraOscuro,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignSelf: 'center',
  },
  modalStartText: {
    color: 'white',
    fontSize: 14,
  },
});