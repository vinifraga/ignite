import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { RFValue } from 'react-native-responsive-fontsize';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import Logo from "../../assets/logo.svg";

import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars
} from './styles';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
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
            { loading ? `Buscando carros...` : `Total de ${cars.length} carros` }
          </TotalCars>
        </HeaderContent>
      </Header>

      { loading ? <LoadAnimation /> : (
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
    </Container>
  );
}