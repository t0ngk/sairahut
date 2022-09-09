<script>
	import { onMount } from 'svelte';
	import { get } from '$lib/api';
	import { page } from '$app/stores';
	import WantedCard from '../components/WantedCard.svelte';
	const duration = $page.url.searchParams.get('duration') || 200;
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

		fetchPokemon();
		setInterval(async () => {
			await fetchPokemon();
		}, 8000);

		const left = document.getElementsByClassName('toleft');
		const right = document.getElementsByClassName('toright');

		left[0].style.animationDuration = duration + 's';
		right[0].style.animationDuration = duration + 's';
		left[1].style.animationDuration = duration + 's';
		async function fetchPokemon() {
			let getAllSenior = await get(`/api/senior/`, token);
			getAllSenior = getAllSenior.filter((senior) => senior.has_junior > 0);

			const perLine = Math.ceil(getAllSenior.length / 3);
			allSenior.line1 = getAllSenior.slice(0, perLine);
			allSenior.line2 = getAllSenior.slice(perLine, perLine * 2);
			allSenior.line3 = getAllSenior.slice(perLine * 2, perLine * 3);
		}
	});
</script>

<div
	class="w-screen flex justify-start items-center overflow-hidden"
	style="height: clac(100vh - 100px)"
>
	<div>
		<div
			class="w-fit relative p-2 flex justify-start items-center gap-2 toleft"
			style="height:calc(33vh - 40px)"
		>
			{#each allSenior.line1 as data, i}
				<WantedCard {data} />
			{/each}
		</div>

		<div
			class="w-fit relative p-2 flex justify-start items-center gap-2 toright"
			style="height:calc(33vh - 40px)"
		>
			{#each allSenior.line2 as data, i}
				<WantedCard {data} />
			{/each}
		</div>

		<div
			class="w-fit relative p-2 flex justify-start items-center gap-2 toleft"
			style="height:calc(33vh - 40px)"
		>
			{#each allSenior.line3 as data, i}
				<WantedCard {data} />
			{/each}
		</div>
	</div>
</div>

<style>
	.toleft {
		animation: toleft 200s linear infinite alternate;
	}
	.toright {
		animation: toright 200s linear infinite alternate;
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
