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

<section class="flex flex-col gap-4">
  <div class="flex items-center justify-between gap-4">
    <h2>Random mapa</h2>
    <button class="btn" on:click={rollMap}>Roll</button>
  </div>

  <div class="flex h-6 justify-center">
    {#key randomMap}
      <div class="fixed" in:fly|local={{ x: -150 }} out:fly|local={{ x: 150 }}>
        {randomMap}
      </div>
    {/key}
  </div>
</section>
