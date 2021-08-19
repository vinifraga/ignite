import { View } from 'react-native';
import styled from 'styled-components/native';

interface BulletViewProps {
  active?: boolean; 
}

export const BulletView = styled(View)<BulletViewProps>`
  width: 6px;
  height: 6px;

  background-color: ${({ theme, active }) => 
    active ? theme.colors.title : theme.colors.text_detail 
  };

  border-radius: 3px;
`;