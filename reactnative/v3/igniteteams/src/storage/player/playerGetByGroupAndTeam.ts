import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { playersGetByGroup } from "./playersGetByGroup";

import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playersGetByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await playersGetByGroup(group);

    const players = storage.filter(player => player.team === team);

    return players;
  } catch (error) {
    throw error;
  }
}