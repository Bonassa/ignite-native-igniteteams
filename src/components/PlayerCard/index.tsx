import React from 'react';
import { Container, Name, Icon } from './styles';
import { ButtonIcon } from '@components/ButtonIcon';

interface PlayerCardProps {
  name: string;
  onRemovePlayer: () => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ name, onRemovePlayer }) => {
  return (
    <Container>
      <Icon name='person' />

      <Name>
        { name }
      </Name>

      <ButtonIcon 
        icon='close'
        type='SECONDARY'
        onPress={onRemovePlayer}
      />
    </Container>
  );
}