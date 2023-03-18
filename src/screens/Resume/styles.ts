import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;

  padding-bottom: 19px;
`;
export const Title = styled.Text`
  color: ${(props) => props.theme.colors.shape};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(18)}px;
`;

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;
export const MonthSelect = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 24px;
`;

export const MonthSelectButton = styled.TouchableOpacity``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
