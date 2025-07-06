import { Stack } from "expo-router";
import { View } from "react-native";
import { HangmanProvider } from "../src/context/hangmanContext";
import { ContentProvider } from "../src/context/contentContext";

export default function RootLayout() {
    return (
        <ContentProvider>
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
        </ContentProvider>
    );
}