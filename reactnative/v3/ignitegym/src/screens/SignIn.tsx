import { Center, Heading, Image, Text, VStack } from "native-base";

import LogoSvg from '@assets/logo.svg';
import backgroundImg from '@assets/background.png';
import { Input } from "@components/Input";
export function SignIn() {
  return (
    <VStack flex={1} bgColor="gray.700">
      <Image 
        source={backgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute"
      />

      <Center my={24}>
        <LogoSvg />

        <Text color="gray.100" fontSize="sm">
          Treine sua mente e o seu corpo
        </Text>
      </Center>

      <Center>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
          Acesse sua conta
        </Heading>

        <Input placeholder="E-mail" />
        <Input placeholder="Senha" />
      </Center>
    </VStack>
  );
}