import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";

import LogoSvg from '@assets/logo.svg';
import backgroundImg from '@assets/background.png';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
export function SignIn() {
  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bgColor="gray.700" px={10} pb={16}>
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

          <Input 
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input 
            placeholder="Senha"
            secureTextEntry  
          />

          <Button 
            title="Acessar"
          />
        </Center>

        <Center mt={24}>
          <Text 
            color="gray.100" 
            fontSize="sm" 
            mb={3} 
            fontFamily="body"
          >
            Ainda não tem acesso?
          </Text>

          <Button
            variant="outline" 
            title="Criar conta"
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}