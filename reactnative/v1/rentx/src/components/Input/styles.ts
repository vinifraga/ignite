import { TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(View)`
  flex-direction: row;
`;

export const IconContainer = styled.View`
  padding: 18px;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  border-right-width: 2px;
  border-right-color: ${({ theme }) => theme.colors.background_primary};
`;


export const InputText = styled(TextInput)`
  flex: 1;

  color: ${({ theme }) => theme.colors.title};
  background-color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 24px;
`;