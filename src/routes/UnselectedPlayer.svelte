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
    class="player"
    on:click={() => {
      selectPlayer(player);
    }}
  >
    {player.name}
  </button>
{/if}

<div class="controls">
  <button class="edit" on:click={startEdit}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
      ><title>edit player name</title><path
        d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
      /></svg
    >
  </button>

  <button
    class="delete"
    on:click={() => {
      deletePlayer(player);
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
      ><title>delete player</title><path
        d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
      /></svg
    >
  </button>
</div>

<style>
  .player:hover {
    border: 2px solid var(--color-green-dark);
  }

  .controls {
    position: absolute;
    height: 100%;
    padding-left: 1.5ch;
    gap: 1.5ch;
  }

  .controls > button {
    display: flex;
    align-items: center;
    border: none;
    background: none;
    padding: 0;
  }

  svg {
    height: 1.5rem;
    color: var(--font-color-primary);
  }
  svg:hover {
    color: var(--font-color-secondary);
  }

  .delete > svg:active {
    color: var(--font-color-red);
  }
</style>
