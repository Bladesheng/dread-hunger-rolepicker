import type { IPlayers } from "$lib/stores/players";

const defaultPlayers = {
  selected: [
    {
      id: 0,
      name: "Mazarin1k",
    },
  ],
  unselected: [
    {
      id: 0,
      name: "Rewerend",
    },
    {
      id: 0,
      name: "Majklicek",
    },
    {
      id: 0,
      name: "Zwejra",
    },
    {
      id: 0,
      name: "Čuson",
    },
    {
      id: 0,
      name: "Dejv",
    },
    {
      id: 0,
      name: "Timko",
    },
    {
      id: 0,
      name: "Enoušek",
    },
    {
      id: 0,
      name: "Sworde",
    },
    {
      id: 0,
      name: "Pizzak",
    },
    {
      id: 0,
      name: "eRko",
    },
  ],
};

// Module for interfacing with Local Storage API
export const Storage = (() => {
  return {
    set Players(newPlayers: IPlayers) {
      localStorage.setItem("Players", JSON.stringify(newPlayers));
    },
    get Players() {
      const raw = localStorage.getItem("Players");
      if (raw === null) {
        return defaultPlayers; // for first time visitors
      } else {
        return JSON.parse(raw) as IPlayers;
      }
    },
  };
})();
