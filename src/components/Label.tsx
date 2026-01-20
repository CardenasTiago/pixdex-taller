// src/components/Label.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/constants";

export const Label = ({ children }: { children: string }) => (
    <View style={styles.box}>
        <Text style={styles.text}>{children.toUpperCase()}</Text>
    </View>
);

const styles = StyleSheet.create({
    box: {
        backgroundColor: Colors.grisOscuro,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    text: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
});
