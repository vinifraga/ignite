import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeSvg from '../assets/home.svg';
import PeopleSvg from '../assets/people.svg';
import CarSvg from '../assets/car.svg';

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';
import { useTheme } from 'styled-components';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.main,
        inactiveTintColor: theme.colors.text_detail,
        showLabel: false,
        style: {
          paddingVertical: getBottomSpace(),
          height: 78,
          backgroundColor: theme.colors.background_primary,
        }
      }}
    >
      <Screen 
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: (({ color }) => (
            <HomeSvg width={24} height={24} color={color} />
          ))
        }}
      />

      <Screen 
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: (({ color }) => (
            <CarSvg width={24} height={24} color={color} />
          ))
        }}
      />

      <Screen 
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: (({ color }) => (
            <PeopleSvg width={24} height={24} color={color} />
          ))
        }}
      />
    </Navigator>
  )
}