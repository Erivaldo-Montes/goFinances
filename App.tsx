import React, { useCallback, useEffect } from "react";
import "react-native-gesture-handler";
import { ThemeProvider } from "styled-components";
import * as SplashScreen from "expo-splash-screen";
import font from "expo-font";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./src/routes/app.routes";
import { CategorySelect } from "./src/screens/CategorySelect";
import { Register } from "./src/screens/Register";
import theme from "./src/global/styles/themes";
import { StatusBar } from "react-native";
import themes from "./src/global/styles/themes";

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
      <NavigationContainer>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={themes.colors.primary}
        />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
