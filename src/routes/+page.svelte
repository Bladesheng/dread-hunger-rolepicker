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

<section class="flex flex-col gap-6">
  <ShuffledPlayers />

  <section class="flex flex-col gap-6">
    <RandomSpells />
    <RandomMap />
  </section>
</section>
