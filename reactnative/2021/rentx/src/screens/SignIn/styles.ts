import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ProtectedInput } from '../../components/ProtectedInput';

export const KAV = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ScrollableContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24
  }
})`
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight(true) + 115}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.title};
`;

export const Form = styled.View`
  width: 100%;
  margin: 64px 0;
`;

export const EmailInput = styled(Input)``;

export const PasswordInput = styled(ProtectedInput)`
  margin-top: 8px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`;

export const Footer = styled.View``;

export const LoginButton = styled(Button)``;

export const RegisterButton = styled(Button).attrs(({ theme }) => ({
  light: true,
  color: theme.colors.shape
}))`
  margin: 8px 0;
`;