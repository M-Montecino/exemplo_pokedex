import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Details() {
  const { params } = useLocalSearchParams();

  useEffect(() => {}, []);

  async function fecthPokemonByName(name: string) {}

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
        <Text>hi!</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fdfdfd",
    textAlign: "center",
  },
});
