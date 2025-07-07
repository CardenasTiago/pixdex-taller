// src/components/Navbar.tsx
import { View, StyleSheet, Dimensions } from "react-native";
import { TextPressStart2P } from "@/src/components/font";
import { Colors } from "@/src/constants/constants";
import { ActionButton } from "@/src/components/actionButtom";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768 && width < 1024;

type Props = {
  onFilterPress: () => void;
};

export function Navbar({ onFilterPress }: Props) {
  return (
    <SafeAreaView>
      <View style={styles.navbar}>
        <TextPressStart2P style={styles.title}>Pixdex</TextPressStart2P>
        <ActionButton
          icon="settings"
          text="FILTRAR"
          onPress={onFilterPress}
          size={isSmallDevice ? 16 : isMediumDevice ? 18 : 20}
          borderTopLeftColor={Colors.purpuraClaro} borderBottomRightColor={Colors.purpuraOscuro}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 3,
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    fontSize: isSmallDevice ? 20 : isMediumDevice ? 22 : isLargeDevice ? 30 : 28,
    fontFamily: "PressStart2P",
    color: Colors.purpura,
  },
});
