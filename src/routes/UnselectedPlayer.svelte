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
    class="btn peer"
    use:autofocus
    bind:value={inputValue}
    on:keyup={handleKeyup}
    on:blur={() => {
      endEdit(inputValue); // save input value on focus loss
    }}
  />
{:else}
  <button
    class="btn peer max-w-full overflow-hidden text-ellipsis hover:border-green-700"
    on:click={() => {
      selectPlayer(player);
    }}
  >
    {player.name}
  </button>
{/if}

<div
  class="absolute -right-8 top-2/4 hidden h-full -translate-y-1/2 translate-x-1/2 gap-2 pl-6 hover:inline-flex peer-hover:inline-flex"
>
  <button class="hover:text-stone-200" on:click={startEdit}>
    <svg class="h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <title>Změnit jméno</title>
      <path
        d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
      />
    </svg>
  </button>

  <button
    class="hover:text-stone-200 active:text-red-500"
    on:click={() => {
      deletePlayer(player);
    }}
  >
    <svg class="h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <title>Smazat hráče</title>
      <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
    </svg>
  </button>
</div>
