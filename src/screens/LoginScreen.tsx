// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, SafeAreaViewBase, Dimensions } from "react-native";
import { TextPressStart2P } from "@/src/components/font";
import { Colors } from "@/src/constants/constants";
import { ActionButton } from "@/src/components/actionButtom";

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768 && width < 1024;

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    // Aquí podrías llamar a tu servicio Supabase
    console.log("Login:", email, password);
    // navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaViewBase style={styles.container}>
      <TextPressStart2P style={styles.title}>Pixdex</TextPressStart2P>
      <View style={styles.form}>
        <TextPressStart2P style={styles.label}>EMAIL</TextPressStart2P>
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


        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <TextPressStart2P style={styles.registerText}>
            ¿No tienes cuenta? Regístrate
          </TextPressStart2P>
        </TouchableOpacity>
      </View>
    </SafeAreaViewBase>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fondo,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: isSmallDevice ? 24 : isMediumDevice ? 28 : 32,
    color: Colors.purpura,
    marginBottom: 40,
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: isSmallDevice ? 12 : isMediumDevice ? 14 : 16,
    color: Colors.purpuraClaro,
    marginBottom: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.purpuraClaro,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontFamily: "PressStart2P",
    color: Colors.purpura,
  },
  button: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  registerText: {
    marginTop: 20,
    color: Colors.gris,
    textAlign: "center",
    fontSize: isSmallDevice ? 10 : isMediumDevice ? 12 : 14,
  },
});
