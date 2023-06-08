<script lang="ts">
  import Selected from "./Selected.svelte";
  import Unselected from "./Unselected.svelte";
  import PlayersCounter from "./PlayersCounter.svelte";
  import ShuffledPlayers from "./ShuffledPlayers.svelte";
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <Unselected />

  <Selected />

  <PlayersCounter />

  <ShuffledPlayers />
</section>

<style>
  section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 40rem;
  }
</style>
