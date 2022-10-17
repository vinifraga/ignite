import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Center, Heading, Image, ScrollView, Text, useToast, VStack } from "native-base";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AppError } from "@utils/AppError";

import LogoSvg from '@assets/logo.svg';
import backgroundImg from '@assets/background.png';
import { useAuth } from "@hooks/useAuth";

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const { signIn } = useAuth();

  const toast = useToast();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    }
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
            Acesse sua conta
          </Heading>

          <Controller 
            control={control}
            name="email"
            rules={{ required: 'Informe o e-mail' }}
            render={({ field: { onChange } }) => (
              <Input 
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller 
            control={control}
            name="password"
            rules={{ required: 'Informe a senha' }}
            render={({ field: { onChange } }) => (
              <Input 
                placeholder="Senha"
                secureTextEntry  
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          
          <Button 
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
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
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}