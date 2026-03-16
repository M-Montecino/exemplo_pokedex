import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorsByType = {
  bug: "#475c4c",
  dark: "#50475c",
  dragon: "#95bab8",
  eletric: "#dbce8c",
  fairy: "#ed9dc5",
  fighting: "#f29988",
  fire: "#f28888",
  flying: "#90aed6",
  ghost: "#8579ab",
  grass: "#88ab79",
  ground: "#705d55",
  ice: "#8da6a5",
  normal: "#e39da8",
  poison: "#68567d",
  psychic: "#ba7799",
  rock: "#453834",
  steel: "#5c5a59",
  water: "#8689e3",
};

export default function Index() {
  const [pokemons, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const reponse = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100",
      );
      const data = await reponse.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemons: any) => {
          const res = await fetch(pokemons.url);
          const details = await res.json();
          return {
            name: pokemons.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        }),
      );

      setPokemon(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {pokemons.map((pokemon) => (
        <Link
          href={{ pathname: "/details", params: { name: pokemon.name } }}
          key={pokemon.name}
        >
          <View
            style={{
              // @ts-ignore
              backgroundColor: colorsByType[pokemon.types[0].type.name],
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name}</Text>

            <View style={{ flexDirection: "row" }}>
              <Image source={{ uri: pokemon.image }} style={styles.image} />
              <Image source={{ uri: pokemon.imageBack }} style={styles.image} />
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
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
    color: "#2e2e2e",
  },
  type: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fdfdfd",
    textAlign: "center",
  },
});
