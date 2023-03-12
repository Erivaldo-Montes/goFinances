import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.TouchableOpacity`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secundary};
  border-radius: 5px;

  align-items: center;
  padding: 18px;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  color: ${(props) => props.theme.colors.shape};
`;
