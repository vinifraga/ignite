import React from 'react';
import { useState } from 'react';
import { Alert, Platform, StatusBar } from 'react-native';
import * as Yup from 'yup';

import {
  KAV,
  ScrollableContainer, 
  Header, 
  Title, 
  SubTitle, 
  Footer, 
  RegisterButton, 
  LoginButton, 
  Form,
  EmailInput,
  PasswordInput
} from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup
          .string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup
          .string()
          .required('Senha obrigatória')
      })
  
      await schema.validate({ email, password }, { abortEarly: false });
      Alert.alert('tudo certo');

      // Fazer login.
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.errors.join('\n'));
      }

      return Alert.alert(
        'Erro na autenticação', 
        'Ocorreu um erro ao fazer login, verifique as credenciais.'
      );
    }
  }

  return (
    <KAV 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollableContainer 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar 
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        <Header>
          <Title>
            Estamos{'\n'}
            quase lá.
          </Title>

          <SubTitle>
            Faça seu login para começar{'\n'}
            uma experiência incrível.
          </SubTitle>
        </Header>

        <Form>
          <EmailInput
            iconName="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <PasswordInput 
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
        </Form>

        <Footer>
          <LoginButton 
            title="Login"
            onPress={handleSignIn}
          />

          <RegisterButton 
            title="Criar conta gratuita"
            onPress={() => {}}
            enabled={false}
          />
        </Footer>
      </ScrollableContainer>
    </KAV>
  );
}
