<script>
  import { getContext, onMount } from "svelte";
  import NumberBox from "./NumberBox.svelte";
  export let title = "A Slider";
  let theValue;
  const sendProgramChange = getContext("sendProgramChangeHandler");

  $: sendProgramChange(6, theValue);
</script>

<NumberBox {title} bind:value={theValue} />
