import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import themes from "../../global/styles/themes";

interface TypeProps {
  type: "up" | "down" | "total";
}

export const Container = styled.View<TypeProps>`
  background-color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.secundary
      : props.theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;

  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.shape
      : props.theme.colors.text_dark};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${(props) =>
    props.type === "up" &&
    css`
      color: ${props.theme.colors.success};
    `}

  ${(props) =>
    props.type === "down" &&
    css`
      color: ${props.theme.colors.attention};
    `}
  
  ${(props) =>
    props.type === "total" &&
    css`
      color: ${props.theme.colors.shape};
    `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.shape
      : props.theme.colors.text_dark};
  margin-top: 38px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-size: ${RFValue(12)}px;
  font-family: ${(props) => props.theme.fonts.regular};

  color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.shape
      : props.theme.colors.text};
`;
