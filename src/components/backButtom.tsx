import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { TextPressStart2P } from "./font";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "@/src/constants/Colors";

export const BackButton = () => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => router.back()}>
      <View style={styles.content}>
        <Ionicons name="arrow-back" size={16} color="white" />
        <TextPressStart2P style={styles.text}>BACK</TextPressStart2P>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.purpura,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 16,
  },
});

export default BackButton;