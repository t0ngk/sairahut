<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Pokedex from '../../components/pokedex.svelte';
	import { get } from '$lib/api';
	import { capitalize, covertToPokemonName } from '$lib/utils'
	const { id } = $page.params;

	let pokemon = {
		name: 'ditto',
		image:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/132.png',
		element: 'normal',
		lvl: 1,
		hp: { remain: 64, max: 64 },
		def: 64,
		atk: 64,
		hints: ['กำลังแปลงร่างเป็นโปรเกม่อนตัวอื่น']
	};

	onMount(async () => {
		const userPokemon = await get(`/api/pokedex/${id}`);
		if (userPokemon == 'Not Found') {
			goto('/collection');
			return;
		}
		const pokemonInfo = await get(`https://pokeapi.co/api/v2/pokemon/${id}`);
		pokemon.name = covertToPokemonName(userPokemon.pokemon_name);
		pokemon.image = pokemonInfo.sprites.other.home.front_default;
		pokemon.lvl = Math.floor(pokemonInfo.base_experience / 10);
		pokemon.hp.max = Math.floor(pokemonInfo.stats[0].base_stat * pokemon.lvl);
		pokemon.hints = userPokemon.hints;
		pokemon.hp.remain = pokemon.hp.max - (pokemon.hp.max / 8) * pokemon.hints.length;
		pokemon.element = capitalize(pokemonInfo.types[0].type.name);
		pokemon.atk =
			pokemonInfo.stats[1].base_stat + pokemonInfo.stats[1].base_stat * 0.5 * pokemon.lvl;
		pokemon.def =
			pokemonInfo.stats[2].base_stat + pokemonInfo.stats[2].base_stat * 0.5 * pokemon.lvl;
	});
</script>

<Pokedex data={pokemon} />
