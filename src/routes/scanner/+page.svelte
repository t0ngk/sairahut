<script>
	let videoElement = '';
	import QrScanner from 'qr-scanner';
	import { post } from '$lib/api';
	import { onMount } from 'svelte';

	onMount(async () => {
		const qrScanner = new QrScanner(
			videoElement,
			async (result) => {
				qrScanner.stop();
				const res = await post(
					'/api/pokedex/catch',
					{ qr_code: result },
					window.localStorage.getItem('token')
				);
				if (res.message == 'You have already found your senior') {
					alert('You have already found your senior');
					return;
				} else if (res.message == 'Quota is full') {
					alert('Quota is full');
					return;
				};
				console.log(res.isFoundSenior);
				setTimeout(() => {
					qrScanner.start();
				}, 2000);
				alert(res.isFoundSenior);
			},
			{ highlightScanRegion: true, onDecodeError() {} }
		);

		qrScanner.start();
	});
</script>

<div class="mx-auto">
	<video class="rounded" bind:this={videoElement} src="">
		<track kind="captions" />
	</video>
</div>
