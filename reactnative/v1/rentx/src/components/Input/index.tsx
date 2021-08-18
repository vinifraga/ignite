import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

import {
  Container, 
  IconContainer, 
  InputText
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  style?: StyleProp<ViewStyle>;
}

export function Input({ iconName, style, ...rest }: InputProps) {
  const theme = useTheme();

  return (
    <Container style={style}>
      <IconContainer>
        <Feather 
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
        />
      </IconContainer>

      <InputText {...rest} />
    </Container>
  );
}