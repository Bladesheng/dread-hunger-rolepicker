<script lang="ts">
  // Component that rolls you random spells combination

  import { fly } from "svelte/transition";

  let randomSpells = "";

  const spells = [
    "Cannibals, Doppelganger, Hush",
    "Cannibals, Hush, Spirit Walk",
    "Cannibals, Spirit Walk, Whiteout",
    "Cannibals, Doppelganger, Spirit Walk",
    "Cannibals, Doppelganger, Whiteout",
    "Cannibals, Hush, Whiteout",
    "Doppelganger, Hush, Spirit Walk",
    "Doppelganger, Spirit Walk, Whiteout",
    "Doppelganger, Hush, Whiteout",
    "Hush, Spirit Walk, Whiteout",
  ];

  function rollSpells() {
    let randomIndex: number;

    do {
      randomIndex = Math.floor(Math.random() * spells.length);
    } while (spells[randomIndex] === randomSpells); // keep rolling until you get different spells than before

    randomSpells = spells[randomIndex];
  }
</script>

<section>
  <h2>Random spelly</h2>
  <button on:click={rollSpells}>Roll</button>
  {#key randomSpells}
    <p in:fly|local={{ x: -300, duration: 500 }} out:fly|local={{ x: 300, duration: 500 }}>
      {randomSpells}
    </p>
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
