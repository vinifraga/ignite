import { VStack } from "native-base";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";

export function Home() {
  return (
    <VStack flex={1}>
      <HomeHeader />
      <Group name="Costas" />
    </VStack>
  )
}