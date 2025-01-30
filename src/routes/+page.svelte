<script>
  import { setContext } from "svelte";
  import MidiSetup from "../components/MidiSetup.svelte";
  import ToneManager from "../components/ToneManager.svelte";
  import DeviceSelectors from "../components/DeviceSelectors.svelte";
  import IoInfo from "../components/IOInfo.svelte";
  import {
    sendProgramChange,
    sendSysexString,
    playTestNote,
  } from "$lib/handlers.js";

  //TODO move to Globals component
  import ControlGroup from "../components/ControlGroup.svelte";
  import Button from "../components/Button.svelte";
  import ProgramChange from "../components/ProgramChange.svelte";
  //TODO end

  let isLoading = true;
  let ioContent = ``;
  let inputDevices = [];
  let outputDevices = [];
  let offsetInputPort = 0;
  let offsetOutputPort = 0;
  $: effectiveInputPort = offsetInputPort - 1;
  $: effectiveOutputPort = offsetOutputPort - 1;
  let selectedTone = 0;
  let showDebug = false;

  const handleMidiSetup = ({ detail }) => {
    const {
      ioContentData,
      inputDevicesData,
      outputDevicesData,
      isLoadingData,
    } = detail;
    ioContent = ioContentData;
    inputDevices = inputDevicesData;
    outputDevices = outputDevicesData;
    isLoading = isLoadingData;
  };

  // contexts
  setContext("sendSysexStringHandler", sendSysexString);
  setContext("sendProgramChangeHandler", sendProgramChange);
  setContext("playTestNoteHandler", playTestNote);
</script>

<svelte:head>
  <title>JV-2080 panel</title>
  <meta name="description" content="JV-2080 panel" />
</svelte:head>

<MidiSetup on:setup={handleMidiSetup} />

<section class="global-controls">
  {#if !isLoading}
    <DeviceSelectors
      {inputDevices}
      {outputDevices}
      bind:offsetInputPort
      bind:offsetOutputPort
    />
  {/if}

  <section>
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
  </section>
</section>

{#if showDebug}
  <pre>effectiveInputPort: {effectiveInputPort}</pre>
  <pre>effectiveOutputPort: {effectiveOutputPort}</pre>
{/if}

<ToneManager
  {inputDevices}
  {outputDevices}
  bind:selectedTone
  bind:effectiveInputPort
  bind:effectiveOutputPort
/>

{#if showDebug}
  <footer>
    <IoInfo {ioContent} />
  </footer>
{/if}

<style>
  /* .tones-container {
    border: 1px solid #535353;
  } */

  .global-controls {
    display: flex;
    margin: 10px;
  }
  article {
    flex: 2;
  }
  aside {
    flex: 1;
  }
</style>
