<script>
	import gsap from 'gsap';
	import { goto } from '$app/navigation';
	let isScanned = false;
	let catchResult = null;
	let errorMessage = 'Loading...';

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

				const res = await post(
					'/api/pokedex/catch',
					{ qr_code: result },
					window.localStorage.getItem('token')
				);

				if (res.message == 'You have already found your senior') {
					errorMessage = 'You have already found your senior';
					return;
				} else if (res.message == 'Quota is full') {
					errorMessage = 'No more quota left';
					return;
				}

				/* --- Expected case (true/false only) --- */
				catchResult = res.isFoundSenior;
			},
			{ highlightScanRegion: true, onDecodeError() {} }
		);

		qrScanner.start();
	};

	const showResult = () => {
		const showResultTl = gsap.timeline({});

		showResultTl
			.to('#pokeball-wrapper', {
				opacity: 0,
				display: 'none'
			})
			.to('#catch-result', {
				display: 'block'
			})
			.to('#catch-result', {
				opacity: 1,
				duration: 1
			});

		showResultTl.from('#achievement', {
			opacity: 0,
			y: 20,
			ease: "power2.easeOut"
		});
	};
	
	const initialAnimation = () => {
		const repeatTime = Math.floor(Math.random() * 7) + 1; // Times that a ball need to bounce.
		const tl = gsap.timeline({
			onComplete: () => showResult()
		});

		tl.to('#pokeball-wrapper', {
			opacity: 1,
			duration: 2
		}).to(
			'#pokeball-wrapper',
			{
				repeat: repeatTime,
				yoyo: true,
				y: 100,
				duration: 1,
				ease: 'bounce.out'
			},
			'<'
		);

		gsap.to('#pokeball-wrapper > div', {
			repeat: repeatTime,
			yoyo: true,
			width: 10,
			duration: 1,
			ease: 'power2',
			background: 'red'
		});
	};

	onMount(() => {
		// initialAnimation(); // เปิดใช้สำหรับ development เท่านั้น
		setScanner();
	});

	$: isScanned,
		(() => {
			if (isScanned) {
				setTimeout(() => {
					initialAnimation();
				}, 100);
			}
		})();
</script>

<div class="mx-auto">
	{#if isScanned}
		<div class="m-4">
			<div class="flex justify-center items-start min-h-[60vh]">
				<div id="pokeball-wrapper" class="opacity-0 relative mt-12">
					<img
						class="w-1/3 mx-auto relative z-10"
						src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
						alt="pokeball"
					/>
					<div
						class="rounded-full absolute w-1/2 aspect-square z-0 bg-red-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
					/>
				</div>
				<div id="catch-result" class="w-full opacity-0 hidden">
					<div class="mt-24 p-4 rounded shadow-xl border border-gray-300">
						<div class="p-4">
							{#if catchResult == null} <!-- ก็คือถ้ามีปัญหาใดๆ ก็ตามที่ผลที่ได้จาก API ไม่เป็น true / fals -->
								<div>
									<p class=" text-center text-2xl font-bold">{errorMessage}</p>
									<p class="text-xl text-center text-gray-400">นั่งพักรอเทรนเนอร์คนอื่นก่อน!</p>
									<button
										class="w-full px-4 py-2 bg-blue-500 rounded text-white shadow mt-12"
										on:click={() => goto('/profile')}
									>
										กลับไปหน้าโปรไฟล์
									</button>
								</div>
							{:else if catchResult == true}
								<div>
									<p class=" text-center text-2xl font-bold">จับสำเร็จ!</p>
									<p class="text-xl text-center text-gray-400">ยินดีด้วยคุณทำภารกิจสำเร็จ</p>
									<div class="flex justify-center my-4">
										<div id="achievement" class="bg-gray-100 p-3 flex space-x-2 roudned-md">
											<svg
												class="bg-yellow-400 p-1 h-auto aspect-square box-content rounded"
												width="22"
												height="20"
												viewBox="0 0 22 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M10.386 1.69075C10.686 0.76975 11.989 0.76975 12.288 1.69075L13.807 6.36475C13.8724 6.56524 13.9995 6.73993 14.1701 6.86385C14.3407 6.98778 14.5461 7.0546 14.757 7.05475H19.672C20.641 7.05475 21.043 8.29475 20.26 8.86475L16.284 11.7528C16.1132 11.8769 15.9861 12.052 15.9209 12.2528C15.8557 12.4536 15.8557 12.6699 15.921 12.8708L17.439 17.5448C17.739 18.4668 16.684 19.2328 15.901 18.6628L11.925 15.7747C11.7541 15.6505 11.5483 15.5836 11.337 15.5836C11.1257 15.5836 10.9199 15.6505 10.749 15.7747L6.77301 18.6628C5.99001 19.2328 4.93501 18.4658 5.23501 17.5448L6.75301 12.8708C6.81829 12.6699 6.81833 12.4536 6.75312 12.2528C6.68791 12.052 6.5608 11.8769 6.39001 11.7528L2.41401 8.86475C1.63001 8.29475 2.03401 7.05475 3.00201 7.05475H7.91601C8.12706 7.05481 8.33271 6.98809 8.50353 6.86415C8.67435 6.74021 8.80158 6.5654 8.86701 6.36475L10.386 1.69075V1.69075Z"
													stroke="#111C43"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
											<div>
												<p class="text-sm text-gray-400 leading-4">Achievement unlocked</p>
												<p class=" leading-4">Beginning of pokemon trainer.</p>
											</div>
										</div>
									</div>
									<button
										class="w-full px-4 py-2 bg-blue-500 rounded text-white shadow mt-12"
										on:click={() => goto('/profile')}
									>
										กลับไปหน้าโปรไฟล์
									</button>
								</div>
							{:else if catchResult == false}
								<p class=" text-center text-2xl font-bold">จับไม่สำเร็จ ลองหาใหม่นะ</p>
								<button
									class="w-full px-4 py-2 bg-blue-500 rounded text-white shadow mt-12"
									on:click={() => {
										window.location.reload();
									}}
								>
									กลับไปสแกน
								</button>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<video class="rounded" bind:this={videoElement} src="">
			<track kind="captions" />
		</video>
	{/if}
</div>
