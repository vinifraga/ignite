import React from 'react';
import { ViewProps } from 'react-native';

import {
  BulletView,
} from './styles';

interface BulletProps extends ViewProps {
  active?: boolean;
}

export function Bullet({ active = false, ...rest }: BulletProps) {
  return (
    <BulletView active={active} {...rest} />
  );
}