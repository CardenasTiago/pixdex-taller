import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// Definir dimensiones y breakpoints
const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768 && width < 1024;

export function Navbar() {  // Nombre del componente con mayúscula
    return(
        <View style={styles.navbar}>
            <Text style={styles.title}>Pixdex</Text>
            <TouchableOpacity style={styles.filterContainer}>
                <Ionicons name="settings" size={isSmallDevice ? 16 : isMediumDevice ? 18 : 20} color="white" />
                <Text style={styles.filtrar}>FILTRAR</Text>
            </TouchableOpacity>
        </View>  // Cierre correcto con </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 40,
        paddingHorizontal: 3,
      },
      
      title: {
        fontSize: isSmallDevice ? 20 : isMediumDevice ? 22 : isLargeDevice ? 24 : 28,
        fontFamily: "PressStart2P",
        color: "#6E59A5",
      },
      
      filterContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#6E59A5",
        paddingVertical: isSmallDevice ? 6 : isMediumDevice ? 7 : 8,
        paddingHorizontal: isSmallDevice ? 8 : isMediumDevice ? 10 : 12,
        gap: 6,
        borderWidth: 2,
        borderTopColor: "#9B87F5",
        borderLeftColor: "#9B87F5",
        borderRightColor: "#4A3D70",
        borderBottomColor: "#4A3D70",
      },
      
      filtrar: {
        color: "white",
        fontFamily: "PressStart2P",
        fontSize: isSmallDevice ? 10 : isMediumDevice ? 11 : 12,

      },
});