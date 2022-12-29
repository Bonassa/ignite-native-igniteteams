import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from '../storageConfig';
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storedPlayers = await playersGetByGroup(group);
    const filteredPlayers = storedPlayers.filter(player => player.name !== playerName);
    const toStorage = JSON.stringify(filteredPlayers);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, toStorage);
  } catch(error) {
    throw error;
  }
}