<script lang="ts">
  // Button that changes into input element on click.
  // Changes back to button on focus loss / esc keypress / enter keypress.

  import { Players } from "$lib/stores/players";

  let editing = false;
  let inputValue: string;

  function autofocus(element: HTMLInputElement) {
    element.focus();
  }

  function startEdit() {
    editing = true;
  }

  function endEdit(textToSave?: string) {
    editing = false;

    if (textToSave) {
      Players.createNew(inputValue);
    }

    inputValue = ""; // clean up the input element
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
  <button on:click={startEdit}>+ Nový hráč</button>
{/if}

<style>
</style>
