// app/_layout.tsx
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: true, // show header for all screens
          }}
        >
          <Stack.Screen name="welcome" options={{ title: "Welcome" }} />
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="login" options={{ title: "Login" }} />
          <Stack.Screen name="register" options={{ title: "Register" }} />
          <Stack.Screen name="contact" options={{ title: "Contact" }} />
          <Stack.Screen name="profile" options={{ title: "Profile" }} />
          <Stack.Screen name="book/[id]" options={{ title: "Book Details" }} />
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
