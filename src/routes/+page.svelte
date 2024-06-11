<script>
	// import Counter from './Counter.svelte';
	// import welcome from '$lib/images/svelte-welcome.webp';
	// import welcome_fallback from '$lib/images/svelte-welcome.png';

	import { onMount, setContext } from "svelte";
	import Slider from "../components/Slider.svelte";
	import { WebMidi } from "/node_modules/webmidi/dist/esm/webmidi.esm.min.js";
    import ControlGroup from "../components/ControlGroup.svelte";

	// onMount(() => {
	WebMidi.enable({ sysex: true })
		.then(onEnabled)
		.catch((err) => console.error(err));

	// Function triggered when WEBMIDI.js is ready
	function onEnabled() {
		const ioContainer = document.querySelector(".io");

		// Display available MIDI input devices
		if (WebMidi.inputs.length < 1) {
			ioContainer.innerHTML += "No device detected.";
		} else {
			ioContainer.innerHTML += `<h2>MIDI Inputs</h2>`;
			WebMidi.inputs.forEach((device, index) => {
				ioContainer.innerHTML += `${index === WebMidi.inputs.length - 1 ? `${index}: ${device.name} <br><br>` : `${index}: ${device.name} <br>`}`;
			});
			ioContainer.innerHTML += `<h2>MIDI Outputs</h2>`;
			WebMidi.outputs.forEach((device, index) => {
				ioContainer.innerHTML += `${index}: ${device.name} <br>`;
			});
		}
	}
	// });

	const createSysexString = (device, param, value) => {
		// F0 41 10 6A 12 03 00 10 51 06 16 F7
		WebMidi.outputs[device].sendSysex(0x41, [
			0x10,
			0x6a,
			0x12,
			0x03,
			0x00,
			0x10,
			param,
			value.toString(16),
			0x16,
		]);
		// WebMidi.outputs[device].sendSysex(0x41, [
		// 	0x10,
		// 	0x6a,
		// 	0x12,
		// 	0x03,
		// 	0x00,
		// 	0x12,
		// 	0x51,
		// 	val.toString(16),
		// 	0x16,
		// ]);
		// WebMidi.outputs[device].sendSysex(0x41, [
		// 	0x10,
		// 	0x6a,
		// 	0x12,
		// 	0x03,
		// 	0x00,
		// 	0x14,
		// 	0x51,
		// 	val.toString(16),
		// 	0x16,
		// ]);
	};

	const sendSysexString = (param, val) => {
		createSysexString(0, param, val);
	};

	const sendProgramChange = (device, val) => {
		WebMidi.outputs[device].sendProgramChange(val);
	};

	setContext("sendSysexStringHandler", sendSysexString);
	setContext("sendProgramChangeHandler", sendProgramChange);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="io"></div>

	<div class="controls">
		<div class="sliders">
			<!-- <button>Send to JV-2080</button> -->
			<ControlGroup title="TVF">
				<Slider title="Cutoff" param={"0x51"} />
				<Slider title="Resonance" param={"0x53"} />
			</ControlGroup>
		</div>

		<div class="program-change">
			<div>
				<div>Program Change</div>
				<input id="prog-num" type="number" min="1" max="128" value="1" />
				<!-- <input id="res-val" type="text"> -->
			</div>
			<div>
				<div>Bank Change</div>
				<input id="bank-num" type="number" min="1" max="128" value="1" />
				<!-- <input id="res-val" type="text"> -->
			</div>
		</div>
	</div>
</section>

<style>
</style>
