import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Input } from '../Input'

import { Container } from './styles';

interface Props extends TextInputProps {
  control: Control;
  name: string;
}

export function InputForm({ control, name, ...rest }: Props) {
  return (
    <Container>
      <Controller 
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
      />
    </Container>
  )
}