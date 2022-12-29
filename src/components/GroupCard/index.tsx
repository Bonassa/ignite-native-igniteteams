import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Icon, Title } from './styles';

interface GroupCardProps extends TouchableOpacityProps {
  title: string;
}

export const GroupCard: React.FC<GroupCardProps> = ({ title, ...rest }) => {
  return (
    <Container 
      {...rest}
    >
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
}