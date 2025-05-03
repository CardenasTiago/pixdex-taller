// src/components/GameCard.tsx

import { Text, View, StyleSheet, Platform } from 'react-native';

interface Props {
  title: string;
  description: string;
  color: 'purple' | 'green';
}

const padding = Platform.OS === 'ios' ? 14 : 12;

export const GameCard = ({ title, description, color }: Props) => {
  const boxStyle = color === 'purple' ? styles.purpleBox : styles.greenBox;

  return (
    <View style={styles.gameBox}>
      <View style={boxStyle}>
        <View style={styles.contentContainer}>
          <Text style={styles.gameTitle}>{title}</Text>
          <Text style={styles.gameDescription}>{description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.playText}>Jugar</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameBox: {
    width: "48.5%",
    marginBottom: 10,
  },
  purpleBox: {
    backgroundColor: "#6E59A5",
    borderWidth: 3,
    borderTopColor: "#8F77CD",
    borderLeftColor: "#8F77CD",
    borderRightColor: "#4A3D70",
    borderBottomColor: "#4A3D70",
    padding,
    height: 160,
    position: "relative",
  },
  greenBox: {
    backgroundColor: "#4CAF50",
    borderWidth: 3,
    borderTopColor: "#6ECF70",
    borderLeftColor: "#6ECF70",
    borderRightColor: "#2E8B30",
    borderBottomColor: "#2E8B30",
    padding,
    height: 160,
    position: "relative",
  },
  contentContainer: {
    height: "80%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    right: 12,
  },
  gameTitle: {
    color: "white",
    fontSize: 18,
    fontFamily: "PressStart2P",
    marginBottom: 8,
  },
  gameDescription: {
    color: "white",
    fontSize: 12,
  },
  playText: {
    color: "white",
    fontFamily: "PressStart2P",
    fontSize: 12,
  },
});
