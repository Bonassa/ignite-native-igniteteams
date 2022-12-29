import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from '../storageConfig';
import { groupGetAll } from './groupGetAll';

import { AppError } from "@utils/AppError";

export async function groupCreate(groupName: string){
  try {
    const storageValues = await groupGetAll();

    const groupAlreadyExists = storageValues.includes(groupName);

    if(groupAlreadyExists){
      throw new AppError('Já existe um grupo cadastrado com esse nome!');
    }

    const toStorage = JSON.stringify([...storageValues, groupName]);

    await AsyncStorage.setItem(GROUP_COLLECTION, toStorage);
  } catch(error) {
    throw error;
  }
}