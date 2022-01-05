import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Container, EmptyPhotoContainer, Image, EmptyPhotoText } from './styles';

type Props = TouchableOpacityProps & {
  uri?: string;
  title: string;
}

export function Photo({ uri, title, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest}>
      <Container>
        {
          uri ? <Image source={{ uri }} /> : (
            <EmptyPhotoContainer>
              <EmptyPhotoText>
                {title}
              </EmptyPhotoText>
            </EmptyPhotoContainer >
          )
        }
      </Container>
    </TouchableOpacity>
  )
}