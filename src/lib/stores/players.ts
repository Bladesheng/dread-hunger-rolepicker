import { writable } from "svelte/store";

export type IPlayer = {
  id: number;
  name: string;
};

let uid = 0;

function createPlayersStore() {
  const { subscribe, set, update } = writable<{ selected: IPlayer[]; unselected: IPlayer[] }>({
    selected: [],
    unselected: [],
  });

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
  };
}

export const Players = createPlayersStore();
