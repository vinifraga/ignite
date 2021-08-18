import React from 'react';
import { useState } from 'react';
import { Platform, StatusBar } from 'react-native';

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
            enabled={false}
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
