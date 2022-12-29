import { playersGetByGroup } from './playersGetByGroup';

export async function playersGetByGroupAndTeam(group: string, team: string){
  try {
    const storedPlayers = await playersGetByGroup(group);
    const teamPlayers = storedPlayers.filter(player => player.team === team);

    return teamPlayers;
  } catch(error) {
    throw error;
  }
}