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
  value: string;
}

export function ProtectedInput({ style, value, ...rest }: ProtectedInputProps) {
  const theme = useTheme();
  const [isTextEntrySecured, setIsTextEntrySecured] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handleToggleSecureTextEntry() {
    setIsTextEntrySecured(state => !state);
  }

  return (
    <Container style={style} isFocused={isFocused}>
      <IconContainer>
        <Feather 
          name="lock"
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText
        placeholderTextColor={theme.colors.text_detail}
        secureTextEntry={isTextEntrySecured}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
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