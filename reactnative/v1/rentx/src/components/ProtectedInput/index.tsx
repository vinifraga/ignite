import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

import {
  Container, 
  IconContainer, 
  InputText,
  ToggleSecureTextEntryButton
} from './styles';
import { useState } from 'react';

interface ProtectedInputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
}

export function ProtectedInput({ style, ...rest }: ProtectedInputProps) {
  const theme = useTheme();
  const [isTextEntrySecured, setIsTextEntrySecured] = useState(true);

  function handleToggleSecureTextEntry() {
    setIsTextEntrySecured(state => !state);
  }

  return (
    <Container style={style}>
      <IconContainer>
        <Feather 
          name="lock"
          size={24}
          color={theme.colors.text_detail}
        />
      </IconContainer>

      <InputText
        placeholderTextColor={theme.colors.text_detail}
        secureTextEntry={isTextEntrySecured}
        {...rest} 
      />

      <ToggleSecureTextEntryButton
        onPress={handleToggleSecureTextEntry}
      >
        <Feather 
          name={ isTextEntrySecured ? "eye-off" : "eye" }
          size={24}
          color={theme.colors.text_detail}
        />
      </ToggleSecureTextEntryButton>
    </Container>
  );
}