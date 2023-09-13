<script lang="ts">
  // Component that shows which players are already selected and for unselecting them

  import { flip } from "svelte/animate";
  import { send, receive, flipSettings } from "./animations";

  import PlayersCounter from "./PlayersCounter.svelte";
  import { Players, type IPlayer } from "$lib/stores/players";

  function unselectPlayer(player: IPlayer) {
    Players.unselect(player);
  }
</script>

<section class="flex flex-col items-center gap-4">
  <h1>Vybraní</h1>

  <PlayersCounter />

  <ol class="flex max-w-full flex-col items-center justify-center gap-2">
    {#each $Players.selected as player (player.id)}
      <li
        class="max-w-full"
        in:receive|local={{ key: player.id }}
        out:send|local={{ key: player.id }}
        animate:flip={flipSettings}
      >
        <button
          class="btn max-w-full overflow-hidden text-ellipsis border-green-700 hover:border-red-600"
          title={player.name}
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
