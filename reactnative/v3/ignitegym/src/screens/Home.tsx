import { HStack, VStack } from "native-base";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { useState } from "react";

export function Home() {
  const [groupSelected, setGroupSelected] = useState('costa');

    return (
    <VStack flex={1}>
      <HomeHeader />

      <HStack>
        <Group 
          name="Costa" 
          isActive={groupSelected === 'costa'}
          onPress={() => setGroupSelected('costa')} 
        />
        <Group 
          name="Ombro" 
          isActive={groupSelected === 'ombro'} 
          onPress={() => setGroupSelected('ombro')} 
        />
      </HStack>
    </VStack>
  )
}