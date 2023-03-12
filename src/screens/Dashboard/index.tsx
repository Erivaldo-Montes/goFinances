import React from "react";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  Icon,
  UserInfo,
  UserPhoto,
  User,
  UserGretting,
  UserName,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "desenvolvimento de site",
      amount: "R$ 23,00",
      category: { name: "vendas", icon: "dollar-sign" },
      date: "02/23/2332",
    },
    {
      id: "2",
      type: "negative",
      title: "pizza",
      amount: "R$ 23,00",
      category: { name: "alimentação", icon: "coffee" },
      date: "02/23/2332",
    },
    {
      id: "3",
      type: "negative",
      title: "aluguel",
      amount: "R$ 1.000,00",
      category: { name: "casa", icon: "home" },
      date: "02/23/2332",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserPhoto
              source={{ uri: "https://github.com/Erivaldo-Montes.png" }}
            />

            <User>
              <UserGretting>Olá,</UserGretting>
              <UserName>Erivaldo</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="entrada"
          amount="R$ 21.122,00"
          lastTransaction="Ùltima entrada dia 13 de março"
        />
        <HighlightCard
          type="down"
          title="saida"
          amount="R$ 21,00"
          lastTransaction="Ùltima saida dia 13 de março"
        />
        <HighlightCard
          type="total"
          title="total"
          amount="R$ 1233,00"
          lastTransaction="de 1 á 6 de março"
        />
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
