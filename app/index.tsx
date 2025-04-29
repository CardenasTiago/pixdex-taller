import { StatusBar, StyleSheet, Text, View,  ActivityIndicator, LogBox } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function index(){
    const [fontsLoaded] = useFonts({
        'PressStart2P': require('../src/assets/fonts/PressStart2P-Regular.ttf'),
      });
    
      if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#fff" />;
      }
    return(   
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Text style={styles.title}> Pixdex</Text>
                <View style={styles.filterContainer}>
                    <Ionicons name="settings" size={20} color="white" />
                    <Text style={styles.filtrar}>FILTRAR</Text>
                </View>
            </View>

            <View style={styles.boxConteiner}>
                <View style={styles.purpleBox}>
                    <Text>Desafio del ahorcado</Text>
                </View>

            </View>
        </View>
        


    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#1A1F2C" 
    },

    navbar: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },

    title:{
        fontSize: 24,
        fontFamily: "PressStart2P",
        color:"#6E59A5",
        fontWeight: "bold"
    },

    filterContainer:{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#6E59A5",
        paddingVertical: 5,
        paddingHorizontal: 15,
        gap: 20,
        padding: 5,
        borderTopColor:"#9B87F5",
        borderLeftColor:"#9B87F5",
        borderRightColor: "#4A3D70",
        borderBottomColor: "#4A3D70",
        borderWidth: 1,
        marginRight: 10,
    },

    filtrar:{
        color: "white",
        fontSize: 16
    },

    boxConteiner:{
        flexDirection: "row",
        marginTop: 20,
        padding: 20
    },

    purpleBox: {
        backgroundColor: "#6E59A5",
        padding: 20,
        marginBottom: 20,
        borderWidth: 2,
        width: 250,
        height: 150
    }

        
})