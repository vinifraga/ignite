import { HStack, VStack } from "native-base";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";

export function Home() {
  return (
    <VStack flex={1}>
      <HomeHeader />
      
      <HStack>
        <Group name="Costa" />
        <Group name="Ombro" />
      </HStack>
    </VStack>
  )
}