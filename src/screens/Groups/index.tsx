import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { Container } from './styles';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Loading } from '@components/Loading';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { groupGetAll } from '@storage/group/groupGetAll';

export const Groups: React.FC = () => {
  const [groupsState, setGroupsState] = useState<string[]>([]);
  const [loadingState, setLoadingState] = useState(true);
  const navigation = useNavigation();

  function handleNewGroup(){
    navigation.navigate('new');
  }

  function handleOpenGroup(group: string){
    navigation.navigate('players', { group });
  }

  async function fetchGroups(){
    try {
      setLoadingState(true);
      const data = await groupGetAll();
      setGroupsState(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight 
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />

      { 
        loadingState ? <Loading /> :
        <FlatList 
          keyExtractor={item => item}
          data={groupsState}
          renderItem={({ item }) => (
            <GroupCard 
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          contentContainerStyle={groupsState.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty 
              message='Que tal cadastrar sua primeira turma?' 
            />
          )}
        />
      }

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />

    </Container>
  );
}