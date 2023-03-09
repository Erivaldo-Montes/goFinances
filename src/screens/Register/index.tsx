import React from "react";

import { Container, Header, Title, Form, Fields } from "./styles";
import { Input } from "../../components/form/Input";
import { Button } from "../../components/form/Button";

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="nome" />
          <Input placeholder="preço" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
