<script>
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';
	import { invalidate, goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { get } from '$lib/api';

	if (browser) {
		invalidate(() => {
			if (!window.localStorage.getItem('token')) {
				goto('/login');
				return;
			}
		});
	}

	let qrCodeElement = '';
	let QrImg = '';
	const generateQR = async (text) => {
		try {
			return await QRCode.toCanvas(qrCodeElement, text, {
				width: 900,
				margin: 0,
				color: {
					dark: '#111C43',
					light: '#00000000'
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	onMount(async () => {
		const qrCodeUrl = await get('/api/auth/profile/qrcode', window.localStorage.getItem('token'));
		if (qrCodeUrl.status == 400) {
			window.location.href = '/';
			return;
		}
		const qr = await generateQR(qrCodeUrl);
		let dataUrl = qr.toDataURL();
		QrImg = dataUrl;
	});
</script>

<!-- <canvas class="mx-auto" bind:this={qrCodeElement} /> -->
<div class="flex justify-center items-center" style="height: calc(100vh - 98px)">
	<div class="bg-[#f3f7fa] p-5 rounded-xl mx-4 border-4 border-[#B0CAF4]" style="max-width: 500px;">
		<img src={QrImg} alt="qrcode" width="100%" />
		<div class="mt-4 mb-1 text-4xl font-black text-[#111C43] flex justify-center items-center">
			<img class="mr-2" src="/icons/pokeball.png" style="width: 30px; height: 30px" alt="poke" /> Catch me
		</div>
	</div>
</div>
