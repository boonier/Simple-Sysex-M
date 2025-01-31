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

//     const payload = [s
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

/**
 * Send a sysex string to the currently selected output port.
 * @param {number} param Parameter to set (e.g. 0x51 for TVF cutoff)
 * @param {number} val Value to set the parameter to
 */
export const sendSysexString = (param: number, val: number) => {
  if (WebMidi.enabled) {
    const port = get(outputPort);
    const final = createSysexString(param, val);
    WebMidi.outputs[port].sendSysex(0x41, final);
  }
};

/**
 * Play a test note on the currently selected output port.
 * @param {number} device The device to send the note to (ignored)
 */
export const playTestNote = (device: number): void => {
  if (WebMidi.enabled) {
    const port = get(outputPort);
    // console.log(port);
    WebMidi.outputs[port].channels[3].playNote(["C3", "E3", "G3", "B3"], {
      duration: 2000,
    });
  }
};

/**
 * Send a program change message to the specified device.
 * @param {number} device The device to send the message to
 * @param {number} val The value to set the program to (1-indexed)
 */
export const sendProgramChange = (device: number, val: number): void => {
  if (WebMidi.enabled) {
    WebMidi.outputs[device]?.sendProgramChange(val - 1, 3);
  }
};
