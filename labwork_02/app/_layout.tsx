import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";

import "../global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
