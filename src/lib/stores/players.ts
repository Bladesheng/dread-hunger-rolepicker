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

let uid = 0;

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
  };
}

export const Players = createPlayersStore();

// for keeping the store in sync with localstorage
Players.subscribe((currentPlayers) => {
  Storage.Players = currentPlayers;
});
