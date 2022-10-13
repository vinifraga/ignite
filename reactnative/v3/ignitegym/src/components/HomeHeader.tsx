import { Avatar, Heading, HStack, Text, VStack } from "native-base";
import { UserPhoto } from "./Avatar";

export function HomeHeader() {
  return (
    <HStack bgColor="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto 
        source={{ uri: 'https://github.com/rodrigorgtic.png' }}
        alt="Imagem do usuário"
        size={16}
        mr={4} 
      />
      
      <VStack>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md">
          Rodrigo
        </Heading>
      </VStack>
    </HStack>
  )
}