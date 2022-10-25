import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { api } from '../../../services/api';

import {
  ConfirmPasswordInput,
  Container,
  FinishRegisterButton,
  Form,
  FormTitle,
  Header,
  PasswordInput,
  ScrollableContainer,
  SignUpFirstStep,
  SignUpSecondStep,
  SignUpSteps,
  SubTitle,
  Title
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SecondStep() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { user } = route.params as Params;

  function handleGoBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  async function handleFinishRegister() {
    try {
      const schema = Yup.object().shape({
        password: Yup
          .string()
          .required('Senha é obrigatória'),
        passwordConfirmation: Yup
          .string()
          .required('Confirmação de senha é obrigatória')
          .equals([Yup.ref('password')], 'A confirmação de senha precisa ser igual à senha')
      })

      const data = { password, passwordConfirmation };
      await schema.validate(data, { abortEarly: false });

      await api.post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,        
      });

      navigation.navigate('Confirmation', {
        title: 'Conta criada!',
        screenToNavigate: 'SignIn',
        message: `Agora é só fazer login\ne aproveitar.`
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.errors.join('\n'));
      }

      return Alert.alert(
        'Erro no cadastro', 
        'Ocorreu um erro ao fazer o cadastro, verifique as credenciais.'
      );
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

            <PasswordInput
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />

            <ConfirmPasswordInput
              placeholder="Repetir Senha"
              autoCorrect={false}
              autoCapitalize="none"
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
            />

            <FinishRegisterButton
              title="Cadastrar"
              color={theme.colors.success}
              onPress={handleFinishRegister}
            />
          </Form>
        </ScrollableContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}