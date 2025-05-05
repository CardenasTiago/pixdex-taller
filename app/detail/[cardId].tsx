import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import DetailsCard from "@/src/screens/DetailsCard";

// Mejorar el tipado
type SearchParams = {
  cardId: string;
};

export default function CardDetailRoute() {
  const params = useLocalSearchParams<SearchParams>();
  const cardId = params.cardId;
  
  if (!cardId) {
    return <Text>Error: No card ID provided</Text>;
  }

  // Convert to number since router params are strings
  const numericCardId = parseInt(cardId, 10);
  
  if (isNaN(numericCardId)) {
    return <Text>Error: Invalid card ID</Text>;
  }

  return <DetailsCard cardId={numericCardId} />;
}