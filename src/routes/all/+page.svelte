<script>
	import { onMount } from 'svelte';
	import { get } from '$lib/api';
	let allSenior = {
		line1: [],
		line2: [],
		line3: []
	};
	onMount(async () => {
		const token = await window.localStorage.getItem('token');
		if (!token) {
			goto('/login');
			return;
		}
		let getAllSenior = await get(`/api/senior/`, token);
		allSenior.line1 = getAllSenior.slice(0, 85);
		allSenior.line2 = getAllSenior.slice(85, 170);
		allSenior.line3 = getAllSenior.slice(170, 255);
	});
</script>

<div class="h-screen w-screen flex justify-start items-center overflow-hidden">
	<div>
		<div class="h-[33vh] w-fit relative p-2 flex justify-start items-center gap-2 toleft">
			{#each allSenior.line1 as data, i}
				<div class="h-[100%] aspect-square relative">
					<div class="w-full h-full rounded-xl relative overflow-hidden">
						<img
							class="w-full h-full absolute blur-sm"
							src="/images/profile/{data.std_id}.png"
							alt=""
							style="object-fit: cover;"
						/>
						<img
							class="w-full h-full absolute"
							src="/images/profile/{data.std_id}.png"
							alt=""
							style="object-fit: contain;"
						/>
					</div>
                    <!-- เอา || true ออก -->
					{#if data.wanted || true}
						<div
							class="absolute rounded-xl w-full h-full bg-[#ffffffc0] top-0 flex justify-center items-center text-red-600 text-2xl"
						>
							แตก
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<div class="h-[33vh] w-fit relative p-2 flex justify-start items-center gap-2 toright">
			{#each allSenior.line2 as data, i}
				<div class="h-[100%] aspect-square relative">
					<div class="w-full h-full rounded-xl relative overflow-hidden">
						<img
							class="w-full h-full absolute blur-sm"
							src="/images/profile/{data.std_id}.png"
							alt=""
							style="object-fit: cover;"
						/>
						<img
							class="w-full h-full absolute"
							src="/images/profile/{data.std_id}.png"
							alt=""
							style="object-fit: contain;"
						/>
					</div>
					{#if data.wanted}
						<div
							class="absolute rounded-xl w-full h-full bg-[#ffffffc0] top-0 flex justify-center items-center text-red-600 text-2xl"
						>
							แตก
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<div class="h-[33vh] w-fit relative p-2 flex justify-start items-center gap-2 toleft">
			{#each allSenior.line3 as data, i}
				<div class="h-[100%] aspect-square relative">
					<div class="w-full h-full rounded-xl relative overflow-hidden">
						<img
							class="w-full h-full absolute blur-sm"
							src="/images/profile/{data.std_id}.png"
							alt=""
							style="object-fit: cover;"
						/>
						<img
							class="w-full h-full absolute"
							src="/images/profile/{data.std_id}.png"
							alt=""
							style="object-fit: contain;"
						/>
					</div>
					{#if data.wanted}
						<div
							class="absolute rounded-xl w-full h-full bg-[#ffffffc0] top-0 flex justify-center items-center text-red-600 text-2xl"
						>
							แตก
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.toleft {
		animation: toleft 100s linear infinite alternate;
	}
	.toright {
		animation: toright 100s linear infinite alternate;
	}
	@keyframes toleft {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-100% + 100vw));
		}
	}
	@keyframes toright {
		0% {
			transform: translateX(calc(-100% + 100vw));
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
