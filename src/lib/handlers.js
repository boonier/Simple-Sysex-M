import { get } from "svelte/store";
import { WebMidi } from "/node_modules/webmidi/dist/esm/webmidi.esm.min.js";
import { createSysexString } from "./helpers";
import { outputPort } from "../store";

// checksum calculation: https://www.vguitarforums.com/smf/index.php?topic=20544.0
// export const createSysexString = (param, value) => {
//   // F0 41 10 6A 12   03 00 10 51 06   16 F7
//   if (WebMidi.enabled) {
//     // TODO:  this is specific to Roland JV-2080
//     const startOfSysex = [0x10, 0x6a, 0x12];
//     // const addressBytes = [0x03, 0x00, 0x10];
//     const addressBytes = [
//       hexToDecimal(0x03),
//       hexToDecimal(0x00),
//       hexToDecimal(0x12),
//     ];

//     const payload = [
//       ...addressBytes, // dec
//       hexToDecimal(param), // dec - parameter
//       parseInt(value), //dec - value
//     ];

//     const final = [
//       ...startOfSysex,
//       ...payload,
//       calculateChecksum(payload), // checksum
//     ];

//     return final;
//   }
// };

export const sendSysexString = (param, val) => {
  if (WebMidi.enabled) {
    const port = get(outputPort);
    const final = createSysexString(param, val);
    WebMidi.outputs[port].sendSysex(0x41, final);
  }
};

export const playTestNote = (device) => {
  if (WebMidi.enabled) {
    const port = get(outputPort);
    console.log(port);

    WebMidi.outputs[port].channels[3].playNote(["C3", "E3", "G3", "B3"], {
      duration: 2000,
    });
  }
};

export const sendProgramChange = (device, val) => {
  if (WebMidi.enabled) {
    WebMidi.outputs[device]?.sendProgramChange(val - 1, 3);
  }
};
