<script>
  import Header from "./Header.svelte";
  import "./styles.css";
</script>

<div class="app">
  <Header />

  <main>
    <slot />
  </main>

  <footer>
    <p>stuff here</p>
  </footer>
</div>

<style>
  footer {
    margin: 10px;
  }
</style>
