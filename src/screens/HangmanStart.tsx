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
import { TextPressStart2P } from "@/src/components/Font";
import { Colors } from "@/src/constants/constants";
import { ROUTES } from '../navigation/routes';
import { useHangman } from '../context/hangmanContext';
import { ActionButton } from '../components/ActionButton';

export function HangmanStart() {
  const router = useRouter();
  const [showNameModal, setShowNameModal] = useState(false);
  const { playerName, setPlayerName, resetGame, topPlayers } = useHangman();

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
      <View style={styles.header}>
        <ActionButton icon='arrow-back' text='BACK' onPress={handleBackPress} borderTopLeftColor={Colors.purpuraClaro} borderBottomRightColor={Colors.purpuraOscuro} />
      </View>
      <View style={styles.border}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <TextPressStart2P style={styles.gameTitle}>
              Hangman{'\n'}Challenge
            </TextPressStart2P>
          </View>

          <Text style={styles.description}>
            Guess the titles of popular TV shows, movies, and anime one letter at a time.
            You have 5 lives - can you get the highest score?
          </Text>

          <View style={styles.startButton}>
            <ActionButton icon='' text='START GAME' onPress={handleStartGame} borderTopLeftColor={Colors.verde} borderBottomRightColor={Colors.verdeOscuro} />
          </View>
          <View style={styles.leaderboardContainer}>
            <TextPressStart2P style={styles.leaderboardTitle}>
              Top Players
            </TextPressStart2P>

            <View style={styles.playersList}>
              {topPlayers.map((player, index) => (
                <View key={`${player.name}-${index}`} style={styles.playerRow}>
                  <Text style={styles.playerRank}>{index + 1}.</Text>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerScore}>{player.score}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <Modal
          visible={showNameModal}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>

              <TextPressStart2P style={styles.modalTitle}>
                Enter Your Name
              </TextPressStart2P>

              <TextInput
                style={styles.nameInput}
                placeholder="Nombre del jugador"
                placeholderTextColor="#999"
                value={playerName}
                onChangeText={setPlayerName}
                maxLength={20}
                autoFocus={true}
              />
              <View style={styles.startButton}>
                <ActionButton icon='' text='START GAME' onPress={handleStartWithName} borderTopLeftColor={Colors.verde} borderBottomRightColor={Colors.verdeOscuro} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
  },
  border: {
    flex: 1,
    borderWidth: 4,
    borderColor: Colors.grisOscuro,
    padding: 5,
    margin: 10,
    borderRadius: 10,
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
    alignSelf: 'center',
    marginBottom: 20
  },
  leaderboardContainer: {
    flex: 1,
  },
  leaderboardTitle: {
    color: Colors.verde,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
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