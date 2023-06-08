<script lang="ts">
  // Component that rolls you random map

  import { fly } from "svelte/transition";

  let randomMap = "";

  const maps = ["Summit", "Approach", "Expanse"];

  function rollMap() {
    let randomIndex: number;

    do {
      randomIndex = Math.floor(Math.random() * maps.length);
    } while (maps[randomIndex] === randomMap); // keep rolling until you get different map than before

    randomMap = maps[randomIndex];
  }
</script>

<section>
  <h2>Random mapa</h2>
  <button on:click={rollMap}>Roll</button>
  {#key randomMap}
    <p in:fly|local={{ x: -150 }} out:fly|local={{ x: 150 }}>{randomMap}</p>
  {/key}
</section>

<style>
  section {
    place-self: center;

    display: grid;
    grid-template-columns: min-content min-content;
    grid-template-rows: min-content 1rem;
    row-gap: 1rem;
    column-gap: 2.8rem;
    align-items: center;
    justify-items: center;

    white-space: nowrap;
  }

  p {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
  }
</style>
