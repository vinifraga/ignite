import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
} from './styles';

import { Car } from '../../components/Car';

interface CarProps {
  id: number;
  user_id: number;
  car: CarDTO;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleGoBack() {
    if (navigation.canGoBack())
      navigation.goBack()
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('schedules_byuser?user_id=1');
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
      <Header>
        <StatusBar 
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton 
          color={theme.colors.shape}
          onPress={handleGoBack} 
        />

        <Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>
    
      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>05</AppointmentsQuantity>
        </Appointments>

        <FlatList 
          data={cars}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Car data={item.car} />
          )}
        />
      </Content>
    </Container>
  );
}