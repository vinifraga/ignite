import React from 'react';
import LottieView from  'lottie-react-native';

import loadingCar from '../../assets/loading_car.json';

import {
  Container
} from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView 
        source={loadingCar}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
}