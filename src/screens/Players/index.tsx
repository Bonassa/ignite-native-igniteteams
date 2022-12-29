import React, { useState, useEffect, useRef } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { PlayersScreenProps } from 'src/@types/navigation';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { PlayerStorageDTO } from '@storage/player/playerStorageDTO';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';

import { AppError } from '@utils/AppError';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Filter } from '@components/Filter';
import { Loading } from '@components/Loading';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';

export const Players: React.FC = () => {
  const [newPlayerNameState, setNewPlayerNameState] = useState('');
  const [teamState, setTeamState] = useState('Time A');
  const [playersState, setPlayersState] = useState<PlayerStorageDTO[]>([]);
  const [loadingState, setLoadingState] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as PlayersScreenProps;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddNewPlayer(){
    try {
      if(newPlayerNameState.trim().length === 0){
        throw new AppError('Insira o nome do player para cadastrar!');
      }

      await playerAddByGroup(
        {name: newPlayerNameState, team: teamState}, group
      )

      setNewPlayerNameState('');
      newPlayerNameInputRef.current?.blur();
      fetchPlayersByTeam();
    } catch(error) {
      if(error instanceof AppError) {
        Alert.alert('Cadastrar Player', error.message);
      } else {
        Alert.alert('Cadastrar Player', 'Não foi possível cadastrar o player!');
        console.log(error);
      }
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch(error) {
      if(error instanceof AppError) {
        Alert.alert('Remover Usuário', error.message);
      } else {
        Alert.alert('Remover Usuário', 'Não foi possível remover o player!');
        console.log(error);
      }
    }
  }

  async function handleRemoveGroup(){
    Alert.alert(
      'Remover Grupo',
      'Deseja realmente remover esta turma?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', style: 'destructive', onPress: removeGroup }
      ]
    )
  }

  async function removeGroup(){
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch(error) {
      if(error instanceof AppError) {
        Alert.alert('Remover Grupo', error.message);
      } else {
        Alert.alert('Remover Grupo', 'Não foi possível remover este grupo!');
        console.log(error);
      }
    }
  }

  async function fetchPlayersByTeam(){
    try {
      setLoadingState(true);
      const teamPlayers = await playersGetByGroupAndTeam(group, teamState);
      setPlayersState(teamPlayers);
    } catch(error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [teamState])

  return (
    <Container>
      <Header showBackButton />

      <Highlight 
        title={group}
        subtitle='Adicione a galera e separe os times'
      />

      <Form>
        <Input 
          inputRef={newPlayerNameInputRef}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onChangeText={setNewPlayerNameState}
          value={newPlayerNameState}
          onSubmitEditing={handleAddNewPlayer}
          returnKeyType='done'
        />

        <ButtonIcon 
          icon='add'
          onPress={handleAddNewPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === teamState}
              onPress={() => setTeamState(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>
          {playersState.length}
        </NumberOfPlayers>
      </HeaderList>

      { 
        loadingState ? <Loading /> : 
        <FlatList 
          data={playersState}
          keyExtractor={item => item.name}
          renderItem={({ item, index }) => (
            <PlayerCard 
              key={index}
              name={item.name}
              onRemovePlayer={() => {handleRemovePlayer(item.name)}}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty 
              message='Não há pessoas nesse time' 
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            playersState.length === 0 && { flex: 1 }
          ]}
        />
      }

      <Button 
        title="Remover Turma"
        type='SECONDARY'
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}