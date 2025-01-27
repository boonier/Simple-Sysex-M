<script>
  import { getContext } from "svelte";
  export let label = "Hit";

  const triggerHandler = getContext("playTestNoteHandler");
</script>

<button class="btn btn__large" on:click={() => triggerHandler(1)}>{label}</button>

<style>
  .btn__large {
    font-size: 1.3rem;
  }
</style>