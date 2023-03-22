import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HighlightCard } from "../../components/HighlightCard";
import { useTheme } from "styled-components";
import { useFocusEffect } from "@react-navigation/native";
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
  LoadContainer,
} from "./styles";
import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );
  const theme = useTheme();
  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positive" | "negative"
  ) {
    const collectioFilttered = collection.filter(
      (transaction: DataListProps) => transaction.type === type
    );

    if (collectioFilttered.length === 0) {
      return 0;
    }

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectioFilttered.map((transaction: DataListProps) =>
          new Date(transaction.date).getTime()
        )
      )
    );
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      {
        month: "long",
      }
    )}`;
  }

  async function loadTransactions() {
    const dataKey = `@gofinances:transaction_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    let entriesTotal = 0;
    let expensivesTotal = 0;

    const transactionFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensivesTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          currency: "BRL",
          style: "currency",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );

    setTransactions(transactionFormatted);

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionExpansives = getLastTransactionDate(
      transactions,
      "negative"
    );

    const totalInterval =
      lastTransactionExpansives === 0
        ? "Não há transacões"
        : `01 á ${lastTransactionExpansives}`;

    const total = entriesTotal - expensivesTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          currency: "BRL",
          style: "currency",
        }),
        lastTransaction:
          lastTransactionEntries === 0
            ? "Não há transasões"
            : `Ùltima entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensivesTotal.toLocaleString("pt-BR", {
          currency: "BRL",
          style: "currency",
        }),
        lastTransaction:
          lastTransactionExpansives === 0
            ? "Não há transasões"
            : `Ùltima entrada dia ${lastTransactionExpansives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          currency: "BRL",
          style: "currency",
        }),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );
  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <UserPhoto source={{ uri: user.photo }} />

                <User>
                  <UserGretting>Olá,</UserGretting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="entrada"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="saida"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
