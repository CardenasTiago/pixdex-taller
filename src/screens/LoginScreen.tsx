import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert, SafeAreaView, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { TextPressStart2P } from "@/src/components/Font";
import { Colors } from "@/src/constants/constants";
import { ActionButton } from "@/src/components/ActionButton";
import { useRouter } from "expo-router";
import { ROUTES } from "@/src/navigation/routes";
import { signIn, isUsernameTaken } from "@/src/services/auth"; // Importamos la nueva función

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    const { data, error } = await signIn(email, password);
    
    if (error) {
        setLoading(false);
        return;
    }

    if (data?.user) {
        router.replace(ROUTES.HOME as any);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextPressStart2P style={styles.title}>INICIAR SESIÓN</TextPressStart2P>

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
            editable={!loading}
          />

          <TextPressStart2P style={[styles.label, { marginTop: 20 }]}>CONTRASEÑA</TextPressStart2P>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor={Colors.gris}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
          />

          <View style={styles.buttonWrapper}>
            {loading ? (
              <ActivityIndicator size="large" color={Colors.purpura} />
            ) : (
              <ActionButton
                icon="log-in"
                text="INGRESAR"
                onPress={handleLogin}
                borderTopLeftColor={Colors.purpuraClaro}
                borderBottomRightColor={Colors.purpuraOscuro}
              />
            )}
          </View>

          <View style={styles.footer}>
            <TextPressStart2P style={styles.footerText}>¿No tienes cuenta?</TextPressStart2P>
            <ActionButton
              icon="person-add-outline"
              text="REGISTRARSE"
              onPress={() => router.push(ROUTES.REGISTER)}
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
    fontSize: isSmallDevice ? 20 : 28,
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
