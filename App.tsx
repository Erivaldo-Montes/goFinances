import React from "react";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { ThemeProvider } from "styled-components";

import AppLoading from "expo-app-loading";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Routes } from "./src/routes";

import { AuthProvider, useAuth } from "./src/hooks/auth";
import { StatusBar } from "react-native";
import themes from "./src/global/styles/themes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStorageLoading } = useAuth();
  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={themes}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={themes.colors.primary}
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
