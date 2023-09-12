<script lang="ts">
  // Components that shows you how many players are already selected

  import { Players } from "$lib/stores/players";

  $: playerCount = $Players.selected.length;
</script>

<section>
  <h2
    class="font-semibold"
    class:text-green-600={playerCount === 8}
    class:text-red-500={playerCount > 8}
  >
    {playerCount}/8 Hráčů
  </h2>
</section>
