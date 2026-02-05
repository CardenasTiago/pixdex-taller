import { View, StyleSheet, Dimensions } from "react-native";
import { TextPressStart2P } from "@/src/components/Font";
import { Colors } from "@/src/constants/constants";
import { ActionButton } from "@/src/components/ActionButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ROUTES } from "@/src/navigation/routes";
import { signOut, getCurrentUser } from "@/src/services/auth";
import React, { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768 && width < 1024;

type Props = {
    onFilterPress: () => void;
};

export function Navbar({ onFilterPress }: Props) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        };
        fetchUser();
    }, []);

    const handleAuthAction = async () => {
        if (user) {
            await signOut();
            setUser(null);
            router.replace(ROUTES.LOGIN as any);
        } else {
            router.push(ROUTES.LOGIN as any);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.navbar}>
                <TextPressStart2P style={styles.title}>Pixdex</TextPressStart2P>
                <View style={styles.buttonsContainer}>
                    <ActionButton
                        icon="settings"
                        text="FILTRAR"
                        onPress={onFilterPress}
                        size={isSmallDevice ? 14 : isMediumDevice ? 16 : 18}
                        borderTopLeftColor={Colors.purpuraClaro}
                        borderBottomRightColor={Colors.purpuraOscuro}
                    />
                    <ActionButton
                        icon={user ? "log-out" : "person"}
                        text={user ? "LOGOUT" : "LOGIN"}
                        onPress={handleAuthAction}
                        size={isSmallDevice ? 14 : isMediumDevice ? 16 : 18}
                        borderTopLeftColor={Colors.purpuraClaro}
                        borderBottomRightColor={Colors.purpuraOscuro}
                    />
                </View>
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
    buttonsContainer: {
        flexDirection: "row",
        gap: 8,
    },
    title: {
        fontSize: isSmallDevice ? 16 : isMediumDevice ? 18 : isLargeDevice ? 24 : 22,
        fontFamily: "PressStart2P",
        color: Colors.purpura,
    },
});
