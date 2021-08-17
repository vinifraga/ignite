import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useTheme } from 'styled-components';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import Logo from "../../assets/logo.svg";

import {
  AnimatedMyCarsButton,
  AnimatedMyCarsView,
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars
} from './styles';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme()

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const animatedMyCarsViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value,
      ctx.positionY = positionY.value
    },
    onActive(event, ctx: any) {
      positionX.value = event.translationX + ctx.positionX,
      positionY.value = event.translationY + ctx.positionY
    },
    onEnd() {
      positionX.value = withSpring(0),
      positionY.value = withSpring(0)
    }
  });

  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars')
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [])

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />

          <TotalCars>
            Total de {cars.length} carros
          </TotalCars>
        </HeaderContent>
      </Header>

      { loading ? <Load /> : (
        <CarList 
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car 
              data={item} 
              onPress={() => handleCarDetails(item)}
            />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <AnimatedMyCarsView style={animatedMyCarsViewStyle}>
          <AnimatedMyCarsButton onPress={handleOpenMyCars}>
            <Ionicons 
              name="ios-car-sport" 
              size={32}
              color={theme.colors.shape}
            />
          </AnimatedMyCarsButton>
        </AnimatedMyCarsView>
      </PanGestureHandler>

    </Container>
  );
}