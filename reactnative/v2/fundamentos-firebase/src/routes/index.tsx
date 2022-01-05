import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { SignIn } from '../screens/SignIn';

export function Routes() {
  return (
    <NavigationContainer>
      <SignIn />
    </NavigationContainer>
  )
}