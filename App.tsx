import React, { useCallback, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import * as SplashScreen from "expo-splash-screen";
import font from "expo-font";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Dashboard } from "./src/screens/Dashboard/index";
import theme from "./src/global/styles/themes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

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

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
