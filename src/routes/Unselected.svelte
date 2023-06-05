<script lang="ts">
  import { flip } from "svelte/animate";
  import { send, receive, flipSettings } from "./animations";

  import EditableButton from "./EditableButton.svelte";
  import { Players, type IPlayer } from "$lib/stores/players";

  function selectPlayer(player: IPlayer) {
    Players.select(player);
  }
</script>

<section>
  <h1>Ostatní</h1>

  <ol>
    {#each $Players.unselected as player (player.id)}
      <li
        in:receive|local={{ key: player.id }}
        out:send|local={{ key: player.id }}
        animate:flip={flipSettings}
      >
        <button
          on:click={() => {
            selectPlayer(player);
          }}
        >
          {player.name}
        </button>
      </li>
    {/each}

    <EditableButton />
  </ol>
</section>

<style>
  section {
    height: 10rem;
  }

  li {
    list-style-type: none;
  }
</style>
