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

<section class="flex flex-col gap-4">
  <div class="flex items-center justify-between gap-4">
    <h2>Random spelly</h2>
    <button class="btn" on:click={rollSpells}>Roll</button>
  </div>

  <div class="relative flex h-6 justify-center">
    {#key randomSpells}
      <div
        class="absolute whitespace-nowrap"
        in:fly|local={{ x: -300, duration: 500 }}
        out:fly|local={{ x: 300, duration: 500 }}
      >
        {randomSpells}
      </div>
    {/key}
  </div>
</section>
