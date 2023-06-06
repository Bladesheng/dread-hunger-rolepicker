<script lang="ts">
  import { flip } from "svelte/animate";
  import { send, receive, flipSettings } from "./animations";

  import EditableButton from "./EditableButton.svelte";
  import { Players, type IPlayer } from "$lib/stores/players";

  function selectPlayer(player: IPlayer) {
    Players.select(player);
  }

  // so that the editableButton can be inside of the #each block which gives it the flip animation
  const buttonPlaceholder = { id: -69, name: "" };
</script>

<section>
  <h1>Ostatní</h1>

  <ol>
    {#each $Players.unselected.concat(buttonPlaceholder) as player (player.id)}
      <li
        in:receive|local={{ key: player.id }}
        out:send|local={{ key: player.id }}
        animate:flip={flipSettings}
      >
        {#if player === buttonPlaceholder}
          <EditableButton />
        {:else}
          <button
            on:click={() => {
              selectPlayer(player);
            }}
          >
            {player.name}
          </button>
        {/if}
      </li>
    {/each}
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
