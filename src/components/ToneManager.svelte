<script>
  import Button from "./Button.svelte";
  import ControlGroup from "./ControlGroup.svelte";
  import ProgramChange from "./ProgramChange.svelte";

  import Tone from "./Tone.svelte";

  export let selectedTone = 0;

  function updateSelectedTone(event) {
    selectedTone = parseInt(event.target.value);
  }
</script>

<section>
  <article class="tones-container">
    <div class="tones-selector">
      <input
        type="radio"
        id="toneChoice1"
        name="tone-select"
        value="0"
        on:change={updateSelectedTone}
        checked={selectedTone === 0}
      />
      <label for="toneChoice1">Tone1</label>
      <input
        type="radio"
        id="toneChoice2"
        name="tone-select"
        value="1"
        on:change={updateSelectedTone}
        checked={selectedTone === 1}
      />
      <label for="toneChoice2">Tone2</label>
      <input
        type="radio"
        id="toneChoice3"
        name="tone-select"
        value="2"
        on:change={updateSelectedTone}
        checked={selectedTone === 2}
      />
      <label for="toneChoice3">Tone3</label>
      <input
        type="radio"
        id="toneChoice4"
        name="tone-select"
        value="3"
        on:change={updateSelectedTone}
        checked={selectedTone === 3}
      />
      <label for="toneChoice4">Tone4</label>
    </div>
    <Tone id={1} isActive={selectedTone === 0} />
    <Tone id={2} isActive={selectedTone === 1} />
    <Tone id={3} isActive={selectedTone === 2} />
    <Tone id={4} isActive={selectedTone === 3} />
  </article>

  <aside>
    <div class="controls controls__patch-performance">
      <div class="program-change">
        <ControlGroup title="Program">
          <ProgramChange title="Patch No." />
        </ControlGroup>
      </div>
    </div>
    <div class="controls">
      <Button label="Play note" />
    </div>
  </aside>
</section>

<style>
  .tones-selector {
    margin: 10px;
  }
</style>
