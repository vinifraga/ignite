import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import {
  Container,
  Title
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
}

export function Button({
  title,
  color,
  loading = false,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <Container {...rest} color={color}>
      {
        loading ? <ActivityIndicator color={theme.colors.shape} /> : <Title>{title}</Title>
      }
    </Container>
  );
}