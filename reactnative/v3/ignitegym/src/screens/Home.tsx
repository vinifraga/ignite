import { useState } from "react";
import { FlatList, Heading, HStack, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const [groups, setGroups] = useState(['costas', 'bíceps', 'tríceps', 'ombro']);
  const [exercises, setExercises] = useState(['Puxada frontal', 'Remada curvada', 'Remada unilateral', 'Levantamento terra']);
  const [groupSelected, setGroupSelected] = useState('costas');

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise');
  }

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
            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
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

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">{exercises.length}</Text>
        </HStack>

        <FlatList 
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => {
            return <ExerciseCard onPress={handleOpenExerciseDetails} />
          }}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 20 }}
        />
      </VStack>
    </VStack>
  )
}