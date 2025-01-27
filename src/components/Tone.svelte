<!--
-- A Tone in JV-2080, is like a self contained synth 
-- with Waveform -> Filter -> Amp -> LFOs etc
-->
<script>
  import ControlGroup from "./ControlGroup.svelte";
  import Slider from "./Slider.svelte";
  export let id;
  export let isActive;
</script>

<div class="tone tone_{id} {isActive ? 'is--active' : ''}">
  <div class="tone__label">Tone {id}</div>

  <div class="tone__controls controls__filter">
    <div class="sliders">
      <!-- <button>Send to JV-2080</button> -->
      <ControlGroup title="TVF">
        <Slider title="Cutoff" param={"0x51"} />
        <Slider title="Resonance" param={"0x53"} />
      </ControlGroup>
    </div>
  </div>
</div>

<style>
  .tone {
    display: none;
  }

  .tone__controls {
    display: flex;
    flex-direction: row;
    border: 1px solid #535353;
    margin: 10px;
    padding: 5px;
  }

  .controls > * {
    flex: 1;
  }

  .tone__label {
    font-size: 1.2rem;
  }

  .is--active {
    display: block;
  }
</style>
