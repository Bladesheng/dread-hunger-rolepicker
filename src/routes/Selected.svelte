<script lang="ts">
  import { flip } from "svelte/animate";
  import { send, receive, flipSettings } from "./animations";

  import { Players, type IPlayer } from "$lib/stores/players";

  function unselectPlayer(player: IPlayer) {
    Players.unselect(player);
  }
</script>

<section>
  <h1>Vybraní</h1>

  <ol>
    {#each $Players.selected as player (player.id)}
      <li
        in:receive|local={{ key: player.id }}
        out:send|local={{ key: player.id }}
        animate:flip={flipSettings}
      >
        <button
          on:click={() => {
            unselectPlayer(player);
          }}
        >
          {player.name}
        </button>
      </li>
    {/each}
  </ol>
</section>

<style>
  section {
    height: 10rem;
  }

  ol {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
  }

  li {
    list-style-type: none;
  }
</style>
