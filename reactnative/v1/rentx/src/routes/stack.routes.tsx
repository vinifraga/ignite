import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { FirstStep } from '../screens/SignUp/FirstStep';
import { SecondStep } from '../screens/SignUp/SecondStep';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="Home">
      <Screen 
        name="Splash"
        component={Splash}
      />

      <Screen 
        name="SignIn"
        component={SignIn}
      />

      <Screen 
        name="SignUpFirstStep"
        component={FirstStep}
      />

      <Screen 
        name="SignUpSecondStep"
        component={SecondStep}
      />

      <Screen 
        name="Home"
        component={Home}
      />
      
      <Screen 
        name="CarDetails"
        component={CarDetails}
      />

      <Screen 
        name="Scheduling"
        component={Scheduling}
      />

      <Screen 
        name="SchedulingDetails"
        component={SchedulingDetails}
      />

      <Screen 
        name="Confirmation"
        component={Confirmation}
      />

      <Screen 
        name="MyCars"
        component={MyCars}
      />
    </Navigator>
  )
}