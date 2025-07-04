import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import {TextPressStart2P} from "@/src/components/font";
import {Colors} from "@/src/constants/Colors";
import { useRouter } from 'expo-router';
import { ROUTES } from '../navegation/routes';

interface Props {
  title: string;
  description: string;
  color: 'purple' | 'green';
}

const padding = Platform.OS === 'ios' ? 14 : 12;

export const GameCard = ({ title, description, color }: Props) => {
  const router = useRouter();
  const boxStyle = color === 'purple' ? styles.purpleBox : styles.greenBox;

  const handlePress = () => {
    if (title === "Desafío del Ahorcado") {
      router.push(ROUTES.HANGMAN);
    } else {
      // Aquí puedes agregar navegación para otros juegos
      console.log(`Navigating to ${title}`);
    }
  };

  return (
    <TouchableOpacity style={styles.gameBox} onPress={handlePress}>
      <View style={boxStyle}>
        <View style={styles.contentContainer}>
          <TextPressStart2P style={styles.gameTitle}>{title}</TextPressStart2P>
          <Text style={styles.gameDescription}>{description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextPressStart2P style={styles.playText}>Jugar</TextPressStart2P>
        </View>
      </View>
    </TouchableOpacity>
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
