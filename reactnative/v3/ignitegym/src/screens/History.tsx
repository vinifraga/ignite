import { VStack } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";

export function History() {
  return (
    <VStack>
      <ScreenHeader title="Histórico de Exercícios" />

      <HistoryCard />
      <HistoryCard />
      <HistoryCard />
    </VStack>
  )
}