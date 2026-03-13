import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Bem-vindo a Pokedéx" }} />
      <Stack.Screen
        name="details"
        options={{
          title: "Detalhes do Pokemon",
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet",
          sheetAllowedDetents: [0.5, 1],
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
