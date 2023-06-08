import { writable } from "svelte/store";

import { Storage } from "$lib/storage";

export type IPlayer = {
  id: number;
  name: string;
};

export type IPlayers = {
  selected: IPlayer[];
  unselected: IPlayer[];
};

// every players is assigned unique ID when they are created (resets on refresh)
let uid = 0;

// custom store for keeping selected and unselected players in state
// you can manipulate the players with some basic CRUD methods
function createPlayersStore() {
  // retrieve players from localstorage and assign them fresh ids (to sync up with uid)
  const storedPlayers = Storage.Players;
  for (const [key, playersList] of Object.entries(storedPlayers)) {
    for (const currentPlayer of playersList) {
      currentPlayer.id = uid++;
    }
  }

  const { subscribe, set, update } = writable<IPlayers>(storedPlayers);

  return {
    subscribe,

    createNew: (playerName: string) => {
      const newPlayer: IPlayer = {
        id: uid++,
        name: playerName,
      };

      update((currentPlayers) => {
        return {
          selected: currentPlayers.selected,
          unselected: [...currentPlayers.unselected, newPlayer],
        };
      });

      console.log("created new player in unselected:", newPlayer);
      return newPlayer;
    },

    select: (player: IPlayer) => {
      update((currentPlayers) => {
        return {
          selected: [...currentPlayers.selected, player],
          unselected: currentPlayers.unselected.filter((currentPlayer) => {
            return currentPlayer.id !== player.id;
          }),
        };
      });

      console.log("selected player:", player);
    },

    unselect: (player: IPlayer) => {
      update((currentPlayers) => {
        return {
          selected: currentPlayers.selected.filter((currentPlayer) => {
            return currentPlayer.id !== player.id;
          }),
          unselected: [player, ...currentPlayers.unselected],
        };
      });

      console.log("unselected player:", player);
    },

    rename: (player: IPlayer, newName: string) => {
      update((currentPlayers) => {
        // loop over both lists
        for (const [key, playersList] of Object.entries(currentPlayers)) {
          for (const currentPlayer of playersList) {
            if (currentPlayer.id === player.id) {
              currentPlayer.name = newName;
            }
          }
        }

        return currentPlayers;
      });

      console.log("renamed player", player, "to", newName);
    },

    delete: (player: IPlayer) => {
      update((currentPlayers) => {
        return {
          selected: currentPlayers.selected.filter((currentPlayer) => {
            return currentPlayer.id !== player.id;
          }),
          unselected: currentPlayers.unselected.filter((currentPlayer) => {
            return currentPlayer.id !== player.id;
          }),
        };
      });

      console.log("deleted player:", player);
    },

    deleteAll: () => {
      set({
        selected: [],
        unselected: [],
      });

      console.log("deleted all players");
    },
  };
}

export const Players = createPlayersStore();

// for keeping the store in sync with localstorage
Players.subscribe((currentPlayers) => {
  Storage.Players = currentPlayers;
});
