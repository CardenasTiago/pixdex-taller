// src/navigation/routes.ts
import { Href } from "expo-router";

export const ROUTES: Record<string, Href> = {
    HOME: "/",
    DETAIL: "/detail/",
    HANGMAN: "/hangman",
    HANGMANGAME: "/hangmangame",
    LOGIN: "/login" as any,
    REGISTER: "/register" as any
}