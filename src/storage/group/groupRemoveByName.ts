import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '../storageConfig';

import { groupGetAll } from './groupGetAll';

export async function groupRemoveByName(deletedGroup: string) {
  try {
    const storedGroup = await groupGetAll();
    const filteredGroups = storedGroup.filter(group => group !== deletedGroup);
    const toStorage = JSON.stringify(filteredGroups);

    await AsyncStorage.setItem(GROUP_COLLECTION, toStorage);
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${deletedGroup}`);
  } catch(error) {
    throw error;
  }
}