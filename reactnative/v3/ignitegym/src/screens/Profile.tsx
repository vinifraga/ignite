import { useState } from "react";
import { Center, ScrollView, Skeleton, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center mt={6} px={10}>
          { photoIsLoading ? (
            <Skeleton 
              w={PHOTO_SIZE} 
              h={PHOTO_SIZE} 
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto 
              source={{ uri: 'https://github.com/rodrigorgtic.png' }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input 
            bgColor="gray.600"
            placeholder="Nome"
          />

          <Input 
            bgColor="gray.600"
            placeholder="E-mail"
            isDisabled
          />

        </Center>
      </ScrollView>
    </VStack>
  )
}