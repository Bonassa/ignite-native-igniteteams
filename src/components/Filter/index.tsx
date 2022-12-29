import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { FilterStyleProps, Container, Title } from './styles';

interface FilterProps extends TouchableOpacityProps, FilterStyleProps {
  title: string;
}

export const Filter: React.FC<FilterProps> = ({ title, isActive = false, ...rest }) => {
  return (
    <Container 
      isActive={isActive}
      {...rest}
    >
      <Title>{title}</Title>
    </Container>
  );
}