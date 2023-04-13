import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export function Profile() {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>

      <TextInput
        testID="input-name"
        placeholder="nome"
        autoCorrect={false}
        value="erivaldo"
      />

      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="montes"
      />

      <Button onPress={() => {}} title="salvar" />
    </View>
  );
}
