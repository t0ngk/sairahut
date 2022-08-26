<script>
	import { gsap  } from 'gsap'; 
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { get } from '$lib/api';

	let page = 1;
	let pokemon = [];

	onMount(async () => {
		let loadPokemon = await get(`/api/pokedex/page/${page}`);
		pokemon = pokemon.concat(await fetchPokemons(loadPokemon));
	});

	let loadMorePokemon = async () => {
		page++;
		let loadPokemon = await get(`/api/pokedex/page/${page}`);
		pokemon = pokemon.concat(await fetchPokemons(loadPokemon));
	};

	let fetchPokemons = async (pokemons) => { // ⚡️ Fetch pokemon มาจาก website official
		
		let result = [];
		for (let index = 0; index < pokemons.length; index++) {
			const pokemon = pokemons[index]; // เข้าถึงข้อมูลโปเกม่อนแต่ละตัวที่ Fetch
			let pokemonData = await get(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_id}`); // ทำการดึงข้อมูลจาก ID นั้นๆ ต่อ
			if (pokemonData.sprites.other.home.front_default == null) {
				console.log(`Pokemon ID ${pokemon.pokemon_id}'s' img not found`);
			}
			result.push({
				id: pokemon.pokemon_id,
				image: pokemonData.sprites.other.home.front_default
			});
		}
		return result;
	};

	const navigate = (pokeNth) => {
		const tl = gsap.timeline({});
		tl.fromTo(
			`.poke-navigator-${pokeNth}`,
			{
				left: '50%',
				top: '100%',
				transform: 'translate(-50%, 0)',
				cursor: 'auto',
				opacity: 0
			},
			{
				width: '222px',
				position: 'fixed',
				top: '370px',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				zIndex: 30,
				duration: 0.6,
				ease: 'power2.easeIn',
				opacity: 1
			}
		)
			.to(
				'#backdrop',
				{
					opacity: 1,
					pointerEvents: 'auto'
				},
				'<'
			)
			.to(`.poke-navigator-${pokeNth}`, {
				scale: 2,
				duration: 0.5,
				onComplete: () => goto(`/collection/${pokeNth}`, { replaceState: false })
			})
			.to(`.poke-navigator-${pokeNth}`, {
				opacity: 0.5
			});
	};

	
</script>

<div class="m-5">
	<div class="text-3xl font-bold py-1 flex mb-2">
		<span class="border-b-2 border-[#f20c32] mr-2">Pokedex collection</span>
	</div>
	<div class="text-md text-[#616573]">Everyone’s pokemons will display here</div>

	<div
		id="backdrop"
		class="pointer-events-none fixed top-0 left-0 w-full h-full bg-white z-20 opacity-0"
	/>

	<div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5">
		{#each pokemon as pokemonInfo}
			<div
				on:click={() => navigate(pokemonInfo.id)}
				class={`poke-navigators poke-navigator-${pokemonInfo.id} cursor-pointer select-none w-full aspect-square border-2 border-[#B0CAF4] bg-[#F3F7FA] rounded-2xl flex justify-center items-center relative`}
			>
				<div
					class="w-1/2 h-1/2 bg-[#E5EEF4] rounded-full relative flex justify-center items-center"
				>
					<img class="w-full" src={pokemonInfo.image} alt="pokemon" />
				</div>
			</div>
		{/each}
	</div>
	<button on:click={loadMorePokemon}>Loadmore</button>
</div>
