<script>
  export let value;
  export let title = "A Slider";

  //needs debouncing
  function handleInput({ target }) {
    value = target.value;
  }
</script>

<div class="numberbox">
  <div class="numberbox__label">{title}</div>
  <input
    class="numberbox__input"
    type="number"
    min="1"
    max="128"
    value="1"
    on:input={handleInput}
    on:keydown={(e) => e.preventDefault()}
  />
</div>

<style>
  .numberbox__input {
    padding: 0.2rem;
    font-size: 1.3rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    text-align: center;
  }
</style>
