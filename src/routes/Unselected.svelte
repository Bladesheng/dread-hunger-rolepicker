<script lang="ts">
  import { flip } from "svelte/animate";
  import { send, receive, flipSettings } from "./animations";

  import UnselectedPlayer from "./UnselectedPlayer.svelte";
  import EditableButton from "./EditableButton.svelte";
  import { Players } from "$lib/stores/players";

  // so that the editableButton can be inside of the #each block which gives it the flip animation
  const editableButtonPlaceholder = { id: -69, name: "" };
</script>

<section>
  <h1>Ostatní</h1>

  <ol>
    {#each $Players.unselected.concat(editableButtonPlaceholder) as player (player.id)}
      <li
        in:receive|local={{ key: player.id }}
        out:send|local={{ key: player.id }}
        animate:flip={flipSettings}
      >
        {#if player === editableButtonPlaceholder}
          <EditableButton />
        {:else}
          <UnselectedPlayer {player} />
        {/if}
      </li>
    {/each}
  </ol>
</section>

<style>
  section {
    height: 10rem;
  }

  ol {
    align-items: flex-start;
  }

  li {
    list-style-type: none;
    display: flex;
    justify-content: flex-end;
  }
</style>
