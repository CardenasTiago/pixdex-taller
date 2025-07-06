import { Stack } from "expo-router";
import { View } from "react-native";
import { HangmanProvider } from "../src/context/hangmanContext"; // Asegúrate de que la ruta sea correcta

export default function RootLayout() {
    return (
        <HangmanProvider>
            <View style={{ flex: 1 }}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        headerBackButtonDisplayMode: "minimal",
                        headerTitleAlign: "center",
                    }}
                />
            </View>
        </HangmanProvider>
    );
}