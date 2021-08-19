import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { BackButton } from '../../../components/BackButton';

import {
  Container,
  DriversLicenseInput,
  EmailInput,
  Form,
  FormTitle,
  Header,
  NameInput,
  NextStepButton,
  ScrollableContainer,
  SignUpFirstStep,
  SignUpSecondStep,
  SignUpSteps,
  SubTitle,
  Title
} from './styles';

export function FirstStep() {
  const navigation = useNavigation();

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
            <FormTitle>1. Dados</FormTitle>

            <NameInput
              iconName="user"
              placeholder="Nome"
              autoCorrect={false}
              // value={name}
              // onChangeText={setName}
            />

            <EmailInput
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              // value={email}
              // onChangeText={setEmail}
            />

            <DriversLicenseInput 
              iconName="credit-card"
              placeholder="CNH"
              // keyboardType="numeric"
              // value={driversLicense}
              // onChangeText={setDriversLicense}
            />

            <NextStepButton
              title="Próximo"
              enabled={false}
              onPress={() => {}}
            />
          </Form>
        </ScrollableContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}