<script>
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";

  import "./styles.css";

  import { Players } from "$lib/stores/players";
  Players.createNew("11111");
  Players.createNew("22222");
  Players.createNew("33333");
  Players.createNew("44444");
  Players.createNew("55555");
  Players.createNew("66666");
  Players.createNew("77777");
  Players.createNew("88888");
  Players.createNew("99999");
  Players.createNew("00000");
  Players.createNew("12121");
  Players.createNew("13131");
</script>

<div class="app">
  <Header />

  <main>
    <slot />
  </main>

  <Footer />
</div>

<style>
</style>
