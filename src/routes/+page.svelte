<script>
  // import Counter from './Counter.svelte';
  // import welcome from '$lib/images/svelte-welcome.webp';
  // import welcome_fallback from '$lib/images/svelte-welcome.png';

  import { onMount, setContext } from "svelte";
  import { PORT_IN, PORT_OUT } from "../store.js";
  import { WebMidi } from "/node_modules/webmidi/dist/esm/webmidi.esm.min.js";
  import {
    hexToDecimal,
    decimalToHex,
    isHexadecimal,
  } from "/src/lib/helpers.js";
  import Slider from "../components/Slider.svelte";
  import ControlGroup from "../components/ControlGroup.svelte";
  import ProgramChange from "../components/ProgramChange.svelte";
  import NumberBox from "../components/NumberBox.svelte";
  import Button from "../components/Button.svelte";
  import Tone from "../components/Tone.svelte";

  let ioContent = ``;
  let inputDevices = [];
  let outputDevices = [];
  let offsetInputPort = 0;
  let offsetOutputPort = 0;

  $: selectedInputPort = offsetInputPort - 1;
  $: selectedOutputPort = offsetOutputPort - 1;
  let selectedTone = 0;
  let isLoading = true;

  onMount(() => {
    WebMidi.enable({ sysex: true })
      .then(onEnabled)
      .catch((err) => console.error(err));

    // Function triggered when WEBMIDI.js is ready
    function onEnabled() {
      // const ioContainer = document.querySelector(".io");
      // Display available MIDI input devices
      if (WebMidi.inputs.length < 1) {
        ioContent += "No device detected.";
      } else {
        ioContent += `<h2>MIDI Inputs</h2>`;

        inputDevices.push("None");
        WebMidi.inputs.forEach((device, index) => {
          inputDevices.push(device.name);
          ioContent += `${index === WebMidi.inputs.length - 1 ? `${index}: ${device.name} <br>` : `${index}: ${device.name} <br>`}`;
        });
        ioContent += `<h2>MIDI Outputs</h2>`;
        outputDevices.push("None");
        WebMidi.outputs.forEach((device, index) => {
          outputDevices.push(device.name);
          ioContent += `${index}: ${device.name} <br>`;
        });

        inputDevices = inputDevices;
        outputDevices = outputDevices;
        isLoading = false;
      }
    }
  });

  const sendSysexString = (param, val) => {
    createSysexString(selectedOutputPort, param, val);
  };

  // checksum calculation: https://www.vguitarforums.com/smf/index.php?topic=20544.0
  const createSysexString = (device, param, value) => {
    // F0 41 10 6A 12   03 00 10 51 06   16 F7
    if (WebMidi.enabled) {
      // TODO:  this is specific to Roland JV-2080
      const startOfSysex = [0x10, 0x6a, 0x12];
      // const addressBytes = [0x03, 0x00, 0x10];
      const addressBytes = [
        hexToDecimal(0x03),
        hexToDecimal(0x00),
        hexToDecimal(0x12),
      ];

      // console.log("addressBytes", addressBytes);

      const payload = [
        ...addressBytes, // dec
        hexToDecimal(param), // dec - parameter
        parseInt(value), //dec - value
      ];

      const final = [
        ...startOfSysex,
        ...payload,
        calculateChecksum(payload), // checksum
      ];
      //   console.log(final);
      WebMidi.outputs[device].sendSysex(0x41, final);
    }
  };

  const calculateChecksum = (payload) => {
    let sum = payload.reduce((acc, curr) => {
      // console.log(curr, 'is hex number', isHexadecimal(curr));
      return acc + curr;
    }, 0);
    let remainder = sum % 128;
    let checksum = 128 - remainder;
    // return checksum.toString(16);
    return checksum;

    // let hexNumber = "1A"; // Hexadecimal number as a string
    // let decimalNumber = parseInt(hexNumber, 16);
    // console.log(decimalNumber); // Output: 26
    // let checksum = 0x80 - (sum % 0x80);
    // if (checksum == 0x80) checksum = 0;
    // return checksum;
  };

  const sendProgramChange = (device, val) => {
    if (WebMidi.enabled) {
      WebMidi.outputs[device]?.sendProgramChange(val - 1, 3);
    }
  };

  const playTestNote = (device) => {
    if (WebMidi.enabled) {
      WebMidi.outputs[selectedOutputPort].channels[3].playNote(["C3"], {
        duration: 2000,
      });
    }
  };

  function updateSelectedTone(event) {
    selectedTone = parseInt(event.target.value);
  }

  // PORT_IN.subscribe((value) => {
  //   selectedInputPort = value;
  // });

  // PORT_OUT.subscribe((value) => {
  //   selectedOutputPort = value;
  // });

  const changeOutputPortHandler = (val) => {
    console.log(val.target.value);
    // PORT_OUT.set(5);
  };

  setContext("sendSysexStringHandler", sendSysexString);
  setContext("sendProgramChangeHandler", sendProgramChange);
  setContext("playTestNoteHandler", playTestNote);
</script>

<svelte:head>
  <title>JV-2080 panel</title>
  <meta name="description" content="JV-2080 panel" />
</svelte:head>

<div class="io-container">
  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <h3>Inputs</h3>
    <select bind:value={offsetInputPort}>
      {#each inputDevices as input, index}
        <option value={index}>{input}</option>
      {/each}
    </select>

    <h3>Outputs</h3>
    <select bind:value={offsetOutputPort}>
      {#each outputDevices as output, index}
        <option value={index}>{output}</option>
      {/each}
    </select>
  {/if}
</div>

<section>
  <!-- Tones -->
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
    <!-- <Tone id={2} isActive={selectedTone === 1} />
    <Tone id={3} isActive={selectedTone === 2} />
    <Tone id={4} isActive={selectedTone === 3} /> -->
  </article>

  <aside>
    <div class="controls controls__patch-performance">
      <div class="program-change">
        <ControlGroup title="Program">
          <ProgramChange title="Patch No." />
          <!-- <NumberBox title="Bank" param={"0x00"} /> -->
        </ControlGroup>
      </div>
    </div>
    <div class="controls">
      <Button label="Play note" />
    </div>
  </aside>
</section>

<footer>
  <div class="io">{@html ioContent}</div>
</footer>

<style>
  .io {
    font-size: 80%;
  }
  section {
    margin: 10px;
  }
  .io-container {
    border: 1px solid #535353;
    display: flex;
    align-items: center;
    margin: 10px;
  }

  .tones-container {
    border: 1px solid #535353;

    /* display: flex; */
    /* flex-direction: row; */
    /* flex-wrap: wrap; */
  }

  section {
    display: flex;
  }
  article {
    flex: 2;
  }
  aside {
    flex: 1;
  }
</style>
