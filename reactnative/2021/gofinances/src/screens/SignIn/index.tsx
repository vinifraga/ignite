import React from 'react';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

import { SignInSocialButton } from '../../components/SignInSocialButton'

import { 
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useState } from 'react';
import { useTheme } from 'styled-components';

export function SignIn() {
  const theme = useTheme();
  const { signInWithGoogle, signInWithApple, isLoggingIn } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Apple');
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={120}
            height={68}
          />

          <Title>
            Controle suas{'\n'}
            finanças de forma{'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com{'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          {
            Platform.OS === 'ios' && (
              <SignInSocialButton
                title="Entrar com Apple"
                svg={AppleSvg}
                onPress={handleSignInWithApple}
              />
            )
          }
        </FooterWrapper>

        { isLoggingIn && (
          <ActivityIndicator 
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        ) }
      </Footer>
    </Container>
  )
}