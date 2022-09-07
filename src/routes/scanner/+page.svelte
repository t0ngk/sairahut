<script>
	let isScanned = false;
	let catchResult = null;
	let errorMessage = "";
	
	let videoElement = '';
	import QrScanner from 'qr-scanner';
	import { post } from '$lib/api';
	import { onMount } from 'svelte';

	const setScanner = () => {
		const qrScanner = new QrScanner(
			videoElement,
			async (result) => {
				isScanned = true;
				qrScanner.stop();
				const res = await post('/api/pokedex/catch',{ qr_code: result },window.localStorage.getItem('token'));

				if (res.message == 'You have already found your senior') {
					errorMessage = 'You have already found your senior';
					return;
				} else if (res.message == 'Quota is full') {
					errorMessage = 'Quota is full';
					return;
				};

				/* --- Normal case (true/false only) --- */
				catchResult = res.isFoundSenior;
			},
			{ highlightScanRegion: true, onDecodeError() {} }
		);

		qrScanner.start();
	}
	
	onMount(() => {
		setScanner()
	});

	$:isScanned , (() => {
		console.log(isScanned)
	})()
	
</script>

<div class="mx-auto">
	{#if isScanned}
		<div class="m-4">
			<div class="flex justify-center items-center min-h-[80vh]">
				<img class="w-1/3" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png" alt="pokeball" />
			</div>
			<button class="px-4 py-2 bg-blue-500 rounded text-white shadow" on:click={() => {
				window.location.reload()
			}}>กลับไปสแกน</button>
			
			<p>{catchResult == null ? errorMessage : `result : ${catchResult}`}</p>
		</div>
	{:else}
		<video class="rounded" bind:this={videoElement} src="">
			<track kind="captions" />
		</video>
	{/if}
</div>
