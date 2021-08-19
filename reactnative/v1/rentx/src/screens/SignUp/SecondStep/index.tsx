import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';

import {
  ConfirmNewPasswordInput,
  Container,
  DriversLicenseInput,
  EmailInput,
  FinishRegisterButton,
  Form,
  FormTitle,
  Header,
  NameInput,
  NewPasswordInput,
  NextStepButton,
  ScrollableContainer,
  SignUpFirstStep,
  SignUpSecondStep,
  SignUpSteps,
  SubTitle,
  Title
} from './styles';

export function SecondStep() {
  const navigation = useNavigation();
  const theme = useTheme();

  function handleGoBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
        
        <SignUpSteps>
          <SignUpFirstStep active />
          <SignUpSecondStep />
        </SignUpSteps>
      </Header>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollableContainer
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Title>
            Crie sua{'\n'}
            conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <NewPasswordInput
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              // value={password}
              // onChangeText={setPassword}
            />

            <ConfirmNewPasswordInput
              placeholder="Repetir Senha"
              autoCorrect={false}
              autoCapitalize="none"
              // value={password}
              // onChangeText={setPassword}
            />

            <FinishRegisterButton
              title="Cadastrar"
              enabled={false}
              color={theme.colors.success}
              onPress={() => {}}
            />
          </Form>
        </ScrollableContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}