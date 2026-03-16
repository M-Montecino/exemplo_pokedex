import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  imageShiny: string;
  id: string;
  weight: string;
  heigth: string;
}

export default function Details() {
  const { name } = useLocalSearchParams();
  const pokemonName = name.toString();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetchPokemonByName(pokemonName);
  }, []);

  async function fetchPokemonByName(name: string) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

      const data = await response.json();

      const pokemonData = {
        name: data.name,
        imageShiny: data.sprites.front_shiny,
        id: data.id,
        weight: data.weight,
        heigth: data.height,
      };

      setPokemon(pokemonData);
    } catch (e) {
      console.log(e);
    }
  }

  if (!pokemon) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      <View
        style={{
          backgroundColor: "#fdfdfd",
          padding: 20,
          borderRadius: 20,
        }}
      >
        <Image style={styles.image} source={{ uri: pokemon.imageShiny }} />
        <Text style={styles.text}>ID do pokemon: {pokemon.id}</Text>
        <Text style={styles.text}>Peso: {pokemon.weight}</Text>
        <Text style={styles.text}>Altura: {pokemon.heigth}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#2e2e2e",
  },
});
