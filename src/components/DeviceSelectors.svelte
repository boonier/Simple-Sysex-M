<script>
  import { outputPort } from "../store/index.js";

  export let inputDevices = [];
  export let outputDevices = [];
  export let offsetInputPort = 0;
  export let offsetOutputPort = 0;

  function handleInputPortChange(event) {
    const inPort = event.target.value - 1;
    console.log("inPort", inPort);
    outputPort.set(inPort);
  }

  function handleOutputPortChange(event) {
    const outPort = event.target.value - 1;
    console.log("effectivePort", outPort);
    outputPort.set(outPort);
  }
</script>

<div class="io-container">
  <h3>Inputs</h3>
  <select bind:value={offsetInputPort}>
    {#each inputDevices as input, index}
      <option value={index}>{input}</option>
    {/each}
  </select>

  <h3>Outputs</h3>
  <select bind:value={offsetOutputPort} on:change={handleOutputPortChange}>
    {#each outputDevices as output, index}
      <option value={index}>{output}</option>
    {/each}
  </select>
</div>

<style>
  .io-container {
    border: 1px solid #535353;
    display: flex;
    align-items: center;
    margin: 10px;
  }
</style>
