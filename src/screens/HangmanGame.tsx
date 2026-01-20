import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TextPressStart2P } from "@/src/components/Font";
import { Colors } from "@/src/constants/constants";
import { useHangman } from '../context/hangmanContext';
import { ROUTES } from '../navigation/routes';
import { ActionButton } from '../components/ActionButton';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function HangmanGame() {
  const router = useRouter();
  const {
    playerName,
    lives,
    setLives,
    score,
    currentContent,
    guessedLetters,
    setGuessedLetters,
    addTopPlayer,
    resetGame,
    nextContent,
    setGameOver,
    gameOver
  } = useHangman();

  const [showTitleModal, setShowTitleModal] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [titleGuess, setTitleGuess] = useState('');
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  const getDisplayTitle = () => {
    return currentContent.nombre
      .split('')
      .map(char => {
        if (char === ' ') return ' ';
        if (guessedLetters.includes(char.toUpperCase())) return char;
        return '_';
      })
      .join(' ');
  };

  const isTitleCompleted = () => {
    return currentContent.nombre
      .split('')
      .every(char => char === ' ' || guessedLetters.includes(char.toUpperCase()));
  };

  const handleGameOver = () => {
    if (!gameOver && playerName.trim()) {
      addTopPlayer({ name: playerName, score });
      setGameOver(true);
    }
    setShowGameOverModal(true);
  };

  const handleReturnToStart = () => {
    setShowGameOverModal(false);
    resetGame();
    router.replace(ROUTES.HANGMAN);
  };

  const handleTitleGuess = () => {
    if (titleGuess.trim().toLowerCase() === currentContent.nombre.toLowerCase()) {
      setShowTitleModal(false);
      setTitleGuess('');
      nextContent();
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setShowTitleModal(false);
      setTitleGuess('');
      if (newLives <= 0) {
        handleGameOver();
      }
    }
  };

  const handleLetterGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      const newGuessedLetters = [...guessedLetters, letter];
      setGuessedLetters(newGuessedLetters);

      if (!currentContent.nombre.toUpperCase().includes(letter)) {
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives <= 0) {
          setShowLetterModal(false);
          handleGameOver();
          return;
        }
      }
    }
    setShowLetterModal(false);
  };

  useEffect(() => {
    if (isTitleCompleted() && guessedLetters.length > 0) {
      setTimeout(() => {
        nextContent();
      }, 1000);
    }
  }, [guessedLetters]);

  useEffect(() => {
    if (lives <= 0 && !showGameOverModal) {
      handleGameOver();
    }
  }, [lives]);

  const renderHearts = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name="heart"
        size={24}
        color={index < lives ? Colors.purpura : '#444'}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.exitButton}>
          <ActionButton
            icon='arrow-back'
            text='EXIT'
            onPress={() => {
              resetGame();
              router.back();
            }}
            borderTopLeftColor={Colors.purpuraClaro} borderBottomRightColor={Colors.purpuraOscuro}
          />
        </View>

        <View style={styles.heartsContainer}>
          {renderHearts()}
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.playerText}>Player: {playerName}</Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>
      </View>

      <View style={styles.border}>
        <View style={styles.gameButtonsContainer}>
          <ActionButton
            icon=''
            text='GUESS TITLE'
            onPress={() => setShowTitleModal(true)}
            borderTopLeftColor={Colors.purpuraClaro} borderBottomRightColor={Colors.purpuraOscuro}
            size={12}
          />

          <ActionButton
            icon=''
            text='GUESS LETTER'
            onPress={() => setShowLetterModal(true)}
            borderTopLeftColor={Colors.purpuraClaro} borderBottomRightColor={Colors.purpuraOscuro}
            size={12}
          />
        </View>

        <View style={styles.contentArea}>
          <Image source={{ uri: currentContent.imageUrl }} style={styles.contentImage} />
        </View>

        <View style={styles.titleArea}>
          <TextPressStart2P style={styles.titleDisplay}>
            {getDisplayTitle()}
          </TextPressStart2P>
        </View>

        <Modal
          visible={showTitleModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowTitleModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowTitleModal(false)}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>

              <TextPressStart2P style={styles.modalTitle}>
                Guess the Title
              </TextPressStart2P>

              <TextInput
                style={styles.titleInput}
                placeholder="Enter complete title"
                placeholderTextColor="#999"
                value={titleGuess}
                onChangeText={setTitleGuess}
                autoFocus={true}
              />

              <View style={styles.submitButtonTitle}>
                <ActionButton
                  icon=''
                  text='SUBMIT GUESS'
                  onPress={handleTitleGuess}
                  borderTopLeftColor={Colors.purpuraClaro} borderBottomRightColor={Colors.purpuraOscuro}
                />
              </View>

            </View>
          </View>
        </Modal>

        <Modal
          visible={showLetterModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowLetterModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowLetterModal(false)}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>

              <TextPressStart2P style={styles.modalTitle}>
                Guess a Letter
              </TextPressStart2P>

              <View style={styles.alphabetGrid}>
                {alphabet.map((letter) => (
                  <TouchableOpacity
                    key={letter}
                    style={[
                      styles.letterButton,
                      guessedLetters.includes(letter) && styles.letterButtonDisabled
                    ]}
                    onPress={() => handleLetterGuess(letter)}
                    disabled={guessedLetters.includes(letter)}
                  >
                    <TextPressStart2P style={[
                      styles.letterButtonText,
                      guessedLetters.includes(letter) && styles.letterButtonTextDisabled
                    ]}>
                      {letter}
                    </TextPressStart2P>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={showGameOverModal}
          transparent={true}
          animationType="fade"
          onRequestClose={handleReturnToStart}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { alignItems: 'center' }]}>
              <TextPressStart2P style={[styles.modalTitle, { color: Colors.purpura }]}>
                GAME OVER
              </TextPressStart2P>

              <Text style={[styles.playerText, { fontSize: 16, marginVertical: 10 }]}>
                Player: {playerName}
              </Text>

              <Text style={[styles.scoreText, { fontSize: 20, fontWeight: 'bold', marginBottom: 20 }]}>
                Score: {score}
              </Text>

              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: Colors.verde }]}
                onPress={handleReturnToStart}
              >
                <TextPressStart2P style={styles.submitButtonText}>
                  RETURN TO START
                </TextPressStart2P>
              </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    gap: 50
  },
  border: {
    flex: 1,
    borderWidth: 4,
    borderColor: Colors.grisOscuro,
    padding: 5,
    margin: 10,
    borderRadius: 10,
  },
  exitButton: {
    flexDirection: 'row',
    flex: 1,
    maxWidth: 100,
  },
  heartsContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  scoreContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  playerText: {
    color: 'white',
    fontSize: 10,
  },
  scoreText: {
    color: 'white',
    fontSize: 10,
  },
  gameButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contentArea: {
    flex: 1,
    margin: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  titleArea: {
    backgroundColor: Colors.grisOscuro,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  titleDisplay: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
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
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  titleInput: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.purpura,
    color: 'white',
    fontSize: 16,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  submitButtonTitle: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  submitButton: {
    backgroundColor: Colors.purpura,
    borderWidth: 3,
    borderColor: Colors.purpuraOscuro,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 12,
  },
  alphabetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  letterButton: {
    backgroundColor: Colors.purpura,
    borderWidth: 2,
    borderColor: Colors.purpuraOscuro,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  letterButtonDisabled: {
    backgroundColor: '#444',
    borderColor: '#666',
  },
  letterButtonText: {
    color: 'white',
    fontSize: 12,
  },
  letterButtonTextDisabled: {
    color: '#999',
  },
});