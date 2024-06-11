<script>
  import { getContext } from "svelte";
  const sendSysexString = getContext("sendSysexStringHandler");
  let sliderValueEl = 64;
  export let title = "A Slider";
  export let param;
</script>

<div class="slider">
  <div class="slider__label">{title}</div>

  <input
    class="slider__input"
    type="range"
    min="0"
    max="127"
    on:input={({ target }) => {
      sendSysexString(param, target.value);
    }}
    bind:value={sliderValueEl}
  />

  <input class="slider__value" type="text" bind:value={sliderValueEl} />
</div>
