<script lang="ts">
  import { Players } from "$lib/stores/players";

  $: playerCount = $Players.selected.length;
</script>

<section>
  <h2 class:full={playerCount === 8} class:overflow={playerCount > 8}>{playerCount}/8 Hráčů</h2>
</section>

<style>
  .full {
    color: green;
  }

  .overflow {
    color: red;
  }
</style>
