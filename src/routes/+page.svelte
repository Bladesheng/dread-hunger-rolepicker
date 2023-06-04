<script lang="ts">
  import Selected from "./Selected.svelte";
  import Unselected from "./Unselected.svelte";

  import { Players } from "$lib/stores/players";

  Players.createNew("11111");
  Players.createNew("22222");
  Players.createNew("33333");
  Players.createNew("44444");
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <Selected />

  <Unselected />

  <h1>Přidělené role</h1>
</section>

<style>
</style>
