import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextPressStart2P } from "./Font";
import { Colors } from "@/src/constants/constants";
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  icon: keyof typeof Ionicons.glyphMap | any; // kept 'or any' as per original, though could be refined
  text: string;
  onPress: () => void;
  size?: number;
  borderTopLeftColor: string;
  borderBottomRightColor: string;
};

export const ActionButton = ({
  icon,
  text,
  onPress,
  size = 16,
  borderTopLeftColor,
  borderBottomRightColor,
}: Props) => {
  return (
    <SafeAreaView>
      <TouchableOpacity style={[
          styles.button,
          {
            borderTopColor: borderTopLeftColor,
            borderLeftColor: borderTopLeftColor,
            borderRightColor: borderBottomRightColor,
            borderBottomColor: borderBottomRightColor,
          },
        ]} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.content}>
          <Ionicons name={icon} size={size} color="white" />
          <TextPressStart2P style={styles.text}>{text}</TextPressStart2P>
        </View>
      </TouchableOpacity>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.purpura,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    alignSelf: 'flex-start',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
