import React from 'react';
import { Container, Message } from './styles';

interface ListEmpryProps {
  message: string;
}

export const ListEmpty: React.FC<ListEmpryProps> = ({ message }) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
}