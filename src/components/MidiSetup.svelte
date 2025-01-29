<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { WebMidi } from "/node_modules/webmidi/dist/esm/webmidi.esm.min.js";

  const dispatch = createEventDispatcher();

  onMount(() => {
    let ioContent = ``;
    let inputDevices = [];
    let outputDevices = [];
    let isLoading = true;

    WebMidi.enable({ sysex: true })
      .then(() => {
        console.log("hello WebMidi", WebMidi);

        if (WebMidi.inputs.length < 1) {
          ioContent += "No device detected.";
        } else {
          ioContent += `<h2>MIDI Inputs</h2>`;
          inputDevices.push("None");
          WebMidi.inputs.forEach((device, index) => {
            inputDevices.push(device.name);
            ioContent += `${index}: ${device.name} <br>`;
          });

          ioContent += `<h2>MIDI Outputs</h2>`;
          outputDevices.push("None");
          WebMidi.outputs.forEach((device, index) => {
            outputDevices.push(device.name);
            ioContent += `${index}: ${device.name} <br>`;
          });
          isLoading = false;
        }

        dispatch("setup", {
          ioContentData: ioContent,
          inputDevicesData: inputDevices,
          outputDevicesData: outputDevices,
          isLoadingData: isLoading,
        });
      })
      .catch((err) => console.error(err));
  });
</script>
