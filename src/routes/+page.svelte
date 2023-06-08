<script lang="ts">
  import Selected from "./Selected.svelte";
  import Unselected from "./Unselected.svelte";
  import ShuffledPlayers from "./ShuffledPlayers.svelte";
  import RandomSpells from "./RandomSpells.svelte";
  import RandomMap from "./RandomMap.svelte";
</script>

<svelte:head>
  <title>Role Picker</title>
</svelte:head>

<Unselected />

<Selected />

<ShuffledPlayers />

<section>
  <RandomSpells />
  <RandomMap />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
  }
</style>
