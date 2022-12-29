import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ButtonIconTypeStyleProps, Container, Icon } from './styles';

export interface ButtonIconProps extends TouchableOpacityProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStyleProps;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, type = 'PRIMARY', ...rest }) => {
  return (
    <Container
      {...rest}
    >
      <Icon
        name={icon}
        type={type}
      />
    </Container>
  );
}