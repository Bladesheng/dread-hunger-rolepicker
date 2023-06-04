<script lang="ts">
  import Selected from "./Selected.svelte";
  import Unselected from "./Unselected.svelte";
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <Unselected />

  <Selected />

  <h1>Přidělené role</h1>
</section>

<style>
  section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 40rem;
  }
</style>
