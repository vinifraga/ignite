import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { Input } from '../../components/Input';

import {
  Container, 
  Header, 
  Title, 
  SubTitle, 
  Footer, 
  RegisterButton, 
  LoginButton, 
  Form
} from './styles';

export function SignIn() {
  const theme = useTheme();

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
        <Input
          iconName="mail"
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
