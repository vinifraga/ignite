import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StatusBar, useWindowDimensions } from 'react-native';

import { ConfirmButton } from '../../components/ConfirmButton';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';
import { useRoute } from '@react-navigation/native';

interface Params {
  title: string;
  message: string;
  screenToNavigate: string;
}

export function Confirmation() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();

  const { message, screenToNavigate, title } = route.params as Params;

  function handleGoToScreen() {
    navigation.reset({
      index: 0,
      routes: [
        { name: screenToNavigate }
      ] 
    })
  }

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleGoToScreen} />
      </Footer>
    </Container>
  );
}