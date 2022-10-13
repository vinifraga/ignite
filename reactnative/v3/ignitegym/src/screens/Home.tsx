import { FlatList, VStack } from "native-base";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { useState } from "react";

export function Home() {
  const [groups, setGroups] = useState(['costas', 'bíceps', 'tríceps', 'ombro']);
  const [groupSelected, setGroupSelected] = useState('costa');

    return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          return (
            <Group 
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)} 
            />
            )
          }}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8
        }}
        my={10}
        maxHeight={10}
      />
    </VStack>
  )
}