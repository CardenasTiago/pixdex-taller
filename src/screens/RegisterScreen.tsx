import React, { useState } from "react";
import { View, StyleSheet, TextInput, Dimensions, ScrollView, SafeAreaView } from "react-native";
import { TextPressStart2P } from "@/src/components/Font";
import { Colors } from "@/src/constants/constants";
import { ActionButton } from "@/src/components/ActionButton";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;

export function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = () => {
        console.log("Register:", username, email, password);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TextPressStart2P style={styles.title}>CREAR CUENTA</TextPressStart2P>

                <View style={styles.form}>
                    <TextPressStart2P style={styles.label}>USUARIO</TextPressStart2P>
                    <TextInput
                        style={styles.input}
                        placeholder="pixel_master"
                        placeholderTextColor={Colors.gris}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />

                    <TextPressStart2P style={[styles.label, { marginTop: 20 }]}>EMAIL</TextPressStart2P>
                    <TextInput
                        style={styles.input}
                        placeholder="tu@email.com"
                        placeholderTextColor={Colors.gris}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextPressStart2P style={[styles.label, { marginTop: 20 }]}>CONTRASEÑA</TextPressStart2P>
                    <TextInput
                        style={styles.input}
                        placeholder="********"
                        placeholderTextColor={Colors.gris}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <View style={styles.buttonWrapper}>
                        <ActionButton
                            icon="person-add"
                            text="REGISTRARSE"
                            onPress={handleRegister}
                            borderTopLeftColor={Colors.purpuraClaro}
                            borderBottomRightColor={Colors.purpuraOscuro}
                        />
                    </View>

                    <View style={styles.footer}>
                        <TextPressStart2P style={styles.footerText}>¿Ya tienes cuenta?</TextPressStart2P>
                        <ActionButton
                            icon="log-in-outline"
                            text="IR AL LOGIN"
                            onPress={() => router.back()}
                            borderTopLeftColor={Colors.gris}
                            borderBottomRightColor={Colors.grisOscuro}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.fondo,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: isSmallDevice ? 18 : isMediumDevice ? 22 : 26,
        color: Colors.purpura,
        marginBottom: 40,
        textAlign: "center",
    },
    form: {
        width: "100%",
        maxWidth: 400,
    },
    label: {
        fontSize: isSmallDevice ? 10 : 12,
        color: Colors.purpuraClaro,
        marginBottom: 8,
    },
    input: {
        borderWidth: 2,
        borderColor: Colors.purpuraClaro,
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontFamily: "PressStart2P-Regular",
        color: "#FFF",
        backgroundColor: "rgba(110, 89, 165, 0.1)",
    },
    buttonWrapper: {
        marginTop: 30,
        alignItems: "center",
    },
    footer: {
        marginTop: 40,
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: Colors.grisOscuro,
        paddingTop: 20,
    },
    footerText: {
        fontSize: 10,
        color: Colors.gris,
        marginBottom: 15,
        textAlign: "center",
    }
});
