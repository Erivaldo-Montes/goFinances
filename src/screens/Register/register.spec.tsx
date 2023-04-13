import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Register } from ".";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import themes from "../../global/styles/themes";

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={themes}>
      <NavigationContainer>{children}</NavigationContainer>
    </ThemeProvider>
  );
};

describe("Register Screen", () => {
  it("should be open category model when user click on button", async () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-category");
    fireEvent.press(buttonCategory);
    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
