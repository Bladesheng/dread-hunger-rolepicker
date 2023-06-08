<script lang="ts">
  // Button with unselected player. Clicking it will select the player.
  // Includes remove button and edit button, which swaps the player button with input for editing name
  // (similar to editableButton)
  import { Players, type IPlayer } from "$lib/stores/players";

  export let player: IPlayer;

  let editing = false;
  let inputValue: string;

  function selectPlayer(player: IPlayer) {
    Players.select(player);
  }

  function deletePlayer(player: IPlayer) {
    Players.delete(player);
  }

  function autofocus(element: HTMLInputElement) {
    element.focus();
    element.value = player.name; // put the current player's name into the input when you start editing
  }

  function startEdit() {
    editing = true;
  }

  function endEdit(textToSave?: string) {
    editing = false;

    if (textToSave) {
      Players.rename(player, textToSave);
    }

    inputValue = ""; // clean up the input element
    // also thanks to this, onblur won't save anything when you cancel with escape
  }

  function handleKeyup(event: KeyboardEvent) {
    const key = event.code;

    if (key === "Escape") {
      endEdit(); // force cancel by omitting inputValue
    } else if (key === "Enter" || key === "NumpadEnter") {
      endEdit(inputValue);
    }
  }
</script>

{#if editing}
  <input
    use:autofocus
    bind:value={inputValue}
    on:keyup={handleKeyup}
    on:blur={() => {
      endEdit(inputValue); // save input value on focus loss
    }}
  />
{:else}
  <button
    on:click={() => {
      selectPlayer(player);
    }}
  >
    {player.name}
  </button>
{/if}

<div class="controls">
  <button class="edit" on:click={startEdit}> edit </button>

  <button
    class="delete"
    on:click={() => {
      deletePlayer(player);
    }}
  >
    X
  </button>
</div>

<style>
  .controls {
    position: absolute;
  }

  button:hover {
    border: 2px solid var(--color-green-dark);
  }

  /* todo: replace buttons with some nice svg icons */
  .edit {
  }
  .delete {
  }
</style>
