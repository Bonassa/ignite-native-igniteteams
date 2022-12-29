import React from 'react';
import { Container, Title, Subtitle } from './styles';

interface HighlightProps {
  title: string;
  subtitle: string;
}

export const Highlight: React.FC<HighlightProps> = ({ title, subtitle }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
}