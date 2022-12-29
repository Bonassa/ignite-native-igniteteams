import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from '../storageConfig';

export async function groupGetAll(): Promise<string[]>{
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);
  
    if(storage) {
      return JSON.parse(storage);
    }
  
    return [];
  } catch (error) {
    throw error;
  }
}