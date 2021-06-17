import React from 'react';
import { HistoryCard } from '../../components/HistoryCard';

import { Container, Header, Title } from './styles';

export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <HistoryCard 
        title="Compras"
        amount="R$ 150,00"
        color="red"
      />
    </Container>
  )
}