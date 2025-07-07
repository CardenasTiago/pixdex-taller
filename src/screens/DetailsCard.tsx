import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { TextPressStart2P } from "@/src/components/font";
import { contenidosAudiovisuales } from "@/src/data/contenidoAudiovisual";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";
import { ActionButton } from "@/src/components/actionButtom";
import { Label } from "@/src/components/lable";                
import { Image } from "expo-image";
import { Colors } from "@/src/constants/constants";

type Props = { cardId: number };

export const DetailsCard = ({ cardId }: Props) => {
  const router = useRouter();

  const contenido = contenidosAudiovisuales.find((c) => c.id === cardId);
  if (!contenido) {
    return (
      <SafeAreaView style={styles.container}>
        <TextPressStart2P style={styles.error}>Contenido no encontrado</TextPressStart2P>
      </SafeAreaView>
    );
  }

  const tipo = tiposContenidoAudiovisual.find((t) => t.id === contenido.tipoId);
  const generos = contenido.generos
    .map((id) => generosContenidoAudiovisual.find((g) => g.id === id)?.nombre)
    .filter(Boolean) as string[];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
          <ActionButton
            icon="arrow-back"
            text="BACK"
            onPress={() => router.back()}
            size={18}
            borderTopLeftColor={Colors.purpuraClaro} borderBottomRightColor={Colors.purpuraOscuro}
          />
        <View style={styles.border}>
          <View style={styles.card}>
            <Image source={{ uri: contenido.imageUrl }} style={styles.image} contentFit="cover" />

            <View style={styles.info}>
              <TextPressStart2P style={styles.title}>{contenido.nombre}</TextPressStart2P>

              {tipo && <Label>{tipo.singular}</Label>}

              <TextPressStart2P style={styles.section}>DESCRIPCIÓN</TextPressStart2P>
              <TextPressStart2P style={styles.description}>{contenido.descripcion}</TextPressStart2P>

              {!!generos.length && (
                <>
                  <TextPressStart2P style={styles.section}>GÉNEROS</TextPressStart2P>
                  <View style={styles.tagsRow}>
                    {generos.map((g) => (
                      <Label key={g}>{g}</Label>
                    ))}
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.fondo },
  border:{flex: 1,
    borderWidth: 4,
    borderColor: Colors.grisOscuro,
    padding: 5,
    margin: 10,
    borderRadius: 10,},
  scroll: { flexGrow: 1, padding: 16, paddingBottom: 24 },
  error: { color: "#FF5555", textAlign: "center", fontSize: 16 },
  card: {
    overflow: "hidden",
    backgroundColor: Colors.grisOscuro + "30",
  },
  image: {
    width: "100%",
    aspectRatio: 2 / 3,
    backgroundColor: Colors.grisOscuro,
  },
  info: { padding: 16, gap: 12 },
  title: { color: Colors.purpuraClaro, fontSize: 18 },
  section: { color: Colors.verde, fontSize: 14 },
  description: { color: "#E2E8F0", fontSize: 14, lineHeight: 20 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
});

export default DetailsCard;
