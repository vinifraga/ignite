import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { BackButton } from '../../../components/BackButton';

import {
  Container,
  Form,
  FormTitle,
  Header,
  NextStepButton,
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

        <NextStepButton
          title="Próximo"
          enabled={false}
          onPress={() => {}}
        />
      </Form>
    </Container>
  );
}