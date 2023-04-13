import React, { useEffect, useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { InputFrom } from "../../components/form/InputFrom";
import { Button } from "../../components/form/Button";
import { TransactionTypeButton } from "../../components/form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import { AppRoutesParamList } from "../../routes/app.routes";
import { useAuth } from "../../hooks/auth";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import uuid from "react-native-uuid";
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

type RegisterNavigationProps = BottomTabNavigationProp<
  AppRoutesParamList,
  "Cadastrar"
>;

const schema = Yup.object().shape({
  name: Yup.string().required("nome é obrigatório"),
  amount: Yup.number()
    .typeError("imforme um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

export function Register() {
  const [tranactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModelOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "categoria",
  });
  const { user } = useAuth();

  const navigation = useNavigation<RegisterNavigationProps>();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionsTypesSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleCloseSelectCategory() {
    setCategoryModelOpen(false);
  }
  function handleOpenSelectCategoryModal() {
    setTimeout(() => {
      setCategoryModelOpen(true);
    }, 1000);
  }

  async function handleRegister(form: FormData) {
    if (!tranactionType) {
      return Alert.alert("Selecione o tipo da transação");
    }
    if (category.key === "category") {
      return Alert.alert("Selecione a categoria");
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: tranactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const dataKey = `@gofinances:transaction_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      setTransactionType("");
      reset();
      setCategory({
        key: "category",
        name: "categoria",
      });

      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputFrom
              control={control}
              name="name"
              placeholder="nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputFrom
              control={control}
              name="amount"
              placeholder="preço"
              keyboardType="numeric"
              error={errors.amount && String(errors.amount.message)}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionsTypesSelect("positive")}
                isActive={tranactionType === "positive"}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionsTypesSelect("negative")}
                isActive={tranactionType === "negative"}
              />
            </TransactionsTypes>

            <CategorySelectButton
              testID="button-category"
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen} testID="modal-category">
          <CategorySelect
            category={category}
            closeSelectCategory={handleCloseSelectCategory}
            setCategory={setCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
