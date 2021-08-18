import React from 'react';
import { StatusBar } from 'react-native';

import {
  Container, 
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

  return (
    <Container>
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
        />

        <PasswordInput 
          placeholder="Senha"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </Form>


      <Footer>
        <LoginButton 
          title="Login"
          onPress={() => {}}
          enabled={false}
        />

        <RegisterButton 
          title="Criar conta gratuita"
          onPress={() => {}}
          enabled={false}
        />
      </Footer>
    </Container>
  );
}
