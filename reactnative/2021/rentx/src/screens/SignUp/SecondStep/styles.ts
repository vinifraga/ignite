import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { ProtectedInput } from '../../../components/ProtectedInput';

export const Container = styled.View`
  flex: 1;
  padding: ${getStatusBarHeight(true) + 31}px 24px 16px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const ScrollableContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 20
  }
})``;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 6px;
`;

export const SignUpSteps = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SignUpFirstStep = styled(Bullet)``;

export const SignUpSecondStep = styled(Bullet)`
  margin-left: 8px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.title};

  margin-top: 60px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`;

export const Form = styled.View`
  width: 100%;
  margin-top: 64px;
`;

export const FormTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.title};
`;

export const PasswordInput  = styled(ProtectedInput)`
  margin-top: 24px;
`;

export const ConfirmPasswordInput  = styled(ProtectedInput)`
  margin-top: 8px;
`;

export const FinishRegisterButton = styled(Button)`
  margin-top: 16px;
`;