import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Content, Icon } from './styles';

import { AppError } from '@utils/AppError';
import { groupCreate } from '@storage/group/groupCreate';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

export const NewGroup: React.FC = () => {
  const navigation = useNavigation();
  const [groupState, setGroupState] = useState('');
  
  const handleAddPlayers = async () => {
    try {
      if(groupState.trim().length === 0){
        throw new AppError('Informe o nome da turma!');
      }

      await groupCreate(groupState);
      navigation.navigate('players', { group: groupState });
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message);
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo!');
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight 
          title='Nova turma'
          subtitle='Crie a turma para adicionar as pessoas'
        />

        <Input 
          placeholder='Nome da turma'
          onChangeText={setGroupState}
        />

        <Button 
          title='Criar'
          onPress={handleAddPlayers}
        />
      </Content>
    </Container>
  );
}