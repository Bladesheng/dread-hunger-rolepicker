<script>
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";

  import "./styles.css";
</script>

<div class="app">
  <Header />

  <main>
    <slot />
  </main>

  <Footer />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;

    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;

    height: 100vh;
    max-height: 100vh;
    /* overflow-y: hidden; */

    font-family: var(--font-stack);
    color: var(--font-color-primary);
    background-color: var(--color-primary);
  }

  main {
    flex: 1 1 auto;
    padding: 4vw;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>
