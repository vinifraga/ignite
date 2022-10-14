import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, ScrollView, Text, VStack } from "native-base";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import LogoSvg from '@assets/logo.svg';
import backgroundImg from '@assets/background.png';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export function SignUp() {
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm<FormDataProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp({ name, email, password, password_confirm }: FormDataProps) {
    console.log({ name, email, password, password_confirm });
  }

  return (
    <ScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image 
          source={backgroundImg}
          defaultSource={backgroundImg}
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
            Crie sua conta
          </Heading>

          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Informe o nome.'
            }}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="password_confirm"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder="Confirme a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />
          
          <Button 
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          variant="outline" 
          title="Voltar para o login"
          mt={24}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}