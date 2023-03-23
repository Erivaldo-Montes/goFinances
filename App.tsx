import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import * as SplashScreen from "expo-splash-screen";

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
  const { userStorageLoading } = useAuth();

  useEffect(() => {
    const showSplashScreen = async () => {
      await SplashScreen.preventAutoHideAsync();
    };

    showSplashScreen();
  }, []);

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    if (fontsLoaded) hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded || userStorageLoading) return null;
  if (!fontsLoaded || userStorageLoading) return null;

  return (
    <ThemeProvider theme={themes}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={themes.colors.primary}
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
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
