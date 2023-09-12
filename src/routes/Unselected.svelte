<script lang="ts">
  // Component that shows all players that are not selected yet.
  // You can create new players, select them, rename them or delete them.

  import { flip } from "svelte/animate";
  import { send, receive, flipSettings } from "./animations";

  import UnselectedPlayer from "./UnselectedPlayer.svelte";
  import EditableButton from "./EditableButton.svelte";
  import { Players } from "$lib/stores/players";

  // only way to give editableButton the flip animation is to put it inside of the #each block
  const editableButtonPlaceholder = { id: -69, name: "" };
</script>

<section class="flex flex-col items-center gap-4">
  <h1>Ostatní</h1>

  <ol class="flex flex-col items-center justify-center gap-2">
    {#each $Players.unselected.concat(editableButtonPlaceholder) as player (player.id)}
      <li
        class="relative"
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
