import { TouchableOpacity } from "react-native";
import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
  return (
    <HStack bgColor="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto 
        source={{ uri: 'https://github.com/rodrigorgtic.png' }}
        alt="Imagem do usuário"
        size={16}
        mr={4} 
      />
      
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Rodrigo
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name="logout" 
          color="gray.200" 
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  )
}