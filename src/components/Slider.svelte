<script lang="ts">
  import { getContext } from "svelte";

  export let title: string = "A Slider";
  export let param: string = "0x00";

  const sendSysexString = getContext("sendSysexStringHandler") as (
    param: string,
    value: number
  ) => void;
  let sliderValueEl: number = 64;
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
