import { supabase } from "@/src/lib/supabase";
import { Alert } from "react-native";

export async function signUp(email: string, password: string, username?: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: username,
            },
        },
    });

    if (error) {
        Alert.alert("Error de registro", error.message);
        return { error };
    }

    return { data };
}

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        Alert.alert("Error de inicio de sesión", error.message);
        return { error };
    }

    return { data };
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        Alert.alert("Error al cerrar sesión", error.message);
        return { error };
    }
}

export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function isUsernameTaken(username: string) {
    const trimmed = username.trim();
    if (!trimmed) return false;

    const { error, count } = await supabase
        .from("profiles") // Asegúrate de que tu tabla se llame 'profiles'
        .select("id", { count: "exact", head: true })
        .ilike("username", trimmed);

    if (error) {
        console.error("Error checking username", error);
        return true; 
    }

    return (count ?? 0) > 0;
}
