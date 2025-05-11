import { Text, View, StyleSheet, Platform } from 'react-native';
import {TextPressStart2P} from "@/src/components/font";
import {Colors} from "@/src/constants/Colors";

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
          <TextPressStart2P style={styles.gameTitle}>{title}</TextPressStart2P>
          <Text style={styles.gameDescription}>{description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextPressStart2P style={styles.playText}>Jugar</TextPressStart2P>
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
    backgroundColor: Colors.purpura,
    borderWidth: 3,
    borderColor: Colors.purpuraOscuro,
    padding,
    height: 160,
    position: "relative",
  },
  greenBox: {
    backgroundColor: Colors.verde,
    borderWidth: 3,
    borderColor: Colors.purpura,
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
