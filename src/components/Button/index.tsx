import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Title, ButtonStylesType } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  type?: ButtonStylesType;
}

export const Button: React.FC<ButtonProps> = ({ title, type = 'PRIMARY', ...rest }) => {
  return (
    <Container 
      type={type} 
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  );
}