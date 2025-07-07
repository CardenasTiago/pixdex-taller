import React, { createContext, useContext, useState, ReactNode } from 'react';
import { contenidosAudiovisuales } from "@/src/data/contenidoAudiovisual";

type ContentItem = typeof contenidosAudiovisuales[0];

type PlayerScore = {
  name: string;
  score: number;
};

type HangmanContextType = {
  playerName: string;
  setPlayerName: (name: string) => void;
  lives: number;
  setLives: (lives: number) => void;
  score: number;
  setScore: (score: number) => void;
  currentContent: ContentItem;
  setCurrentContent: (content: ContentItem) => void;
  guessedLetters: string[];
  setGuessedLetters: (letters: string[]) => void;
  currentContentIndex: number;
  setCurrentContentIndex: (index: number) => void;
  gameOver: boolean;
  setGameOver: (over: boolean) => void;
  topPlayers: PlayerScore[];
  addTopPlayer: (player: PlayerScore) => void;
  resetGame: () => void;
  nextContent: () => void;
};

const HangmanContext = createContext<HangmanContextType | undefined>(undefined);

// 🔁 Función para mezclar el array de contenidos
const shuffleArray = (array: ContentItem[]): ContentItem[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const HangmanProvider = ({ children }: { children: ReactNode }) => {
  const [playerName, setPlayerName] = useState('');
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [shuffledContent, setShuffledContent] = useState<ContentItem[]>(() => shuffleArray(contenidosAudiovisuales));
  const [currentContent, setCurrentContent] = useState<ContentItem>(shuffledContent[0]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [topPlayers, setTopPlayers] = useState<PlayerScore[]>([
    { name: 'PixelMaster', score: 12 },
    { name: 'NinjaGamer', score: 10 },
    { name: 'MediaGuru', score: 8 },
    { name: 'TVFanatic', score: 7 },
    { name: 'AnimeWizard', score: 5 },
  ]);

  const addTopPlayer = (player: PlayerScore) => {
    if (!player.name.trim()) return;

    setTopPlayers(prevPlayers => {
      const playerExists = prevPlayers.some(
        p => p.name === player.name && p.score === player.score
      );
      if (playerExists) return prevPlayers;

      const newPlayers = [...prevPlayers, player]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      return newPlayers;
    });
  };

  const resetGame = () => {
    const newShuffled = shuffleArray(contenidosAudiovisuales);
    setShuffledContent(newShuffled);
    setCurrentContent(newShuffled[0]);
    setLives(5);
    setScore(0);
    setGuessedLetters([]);
    setCurrentContentIndex(0);
    setGameOver(false);
  };

  const nextContent = () => {
    if (currentContentIndex < shuffledContent.length - 1) {
      const newIndex = currentContentIndex + 1;
      setCurrentContentIndex(newIndex);
      setCurrentContent(shuffledContent[newIndex]);
      setGuessedLetters([]);
      setScore(prev => prev + 1);
    } else {
      addTopPlayer({ name: playerName, score });
      setGameOver(true);
    }
  };

  return (
    <HangmanContext.Provider
      value={{
        playerName,
        setPlayerName,
        lives,
        setLives,
        score,
        setScore,
        currentContent,
        setCurrentContent,
        guessedLetters,
        setGuessedLetters,
        currentContentIndex,
        setCurrentContentIndex,
        gameOver,
        setGameOver,
        topPlayers,
        addTopPlayer,
        resetGame,
        nextContent,
      }}
    >
      {children}
    </HangmanContext.Provider>
  );
};

export const useHangman = () => {
  const context = useContext(HangmanContext);
  if (context === undefined) {
    throw new Error('useHangman must be used within a HangmanProvider');
  }
  return context;
};
