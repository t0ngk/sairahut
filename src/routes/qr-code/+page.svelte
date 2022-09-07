<script>
	let videoElement = '';
	import QrScanner from 'qr-scanner';
	import { onMount } from 'svelte';

	onMount(async () => {
		const qrScanner = new QrScanner(videoElement, (result) => {
      alert(result);
		});

		qrScanner.start();
	});
</script>

<div class="mx-auto">
	<video class="rounded" bind:this={videoElement} src="">
		<track kind="captions" />
	</video>
</div>
