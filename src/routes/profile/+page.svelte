<script>
	import { afterNavigate, goto } from '$app/navigation';
	import { get } from '$lib/api';
	import { onMount } from 'svelte';
	import Pokedex from '../components/pokedex.svelte';
	import { capitalize, covertToPokemonName } from '$lib/utils';
	afterNavigate(() => {
		if (!window.localStorage.getItem('token')) {
			goto('/login');
			return;
		}
	});

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
		const token = await window.localStorage.getItem('token');
		if (!token) {
			goto('/login');
			return;
		}
		const { user } = await get('/api/auth/profile', token);
		if (user == undefined) {
			return;
		}
		if (user.pokemon_id == null) {
			pokemon.name = 'Pokemon Egg';
			pokemon.element = 'Unknow';
			pokemon.lvl = 0;
			pokemon.hp.remain = 1;
			pokemon.hp.max = 1;
			pokemon.atk = 1;
			pokemon.def = 1;
			pokemon.hints = ['ไข่กำลังฟักตัวอยู่'];
			return;
		}
		const userPokemon = await get(`/api/pokedex/${user.pokemon_id}`);
		const pokemonInfo = await get(`https://pokeapi.co/api/v2/pokemon/${userPokemon.pokemon_id}`);
		pokemon.name = covertToPokemonName(userPokemon.pokemon_name);
		if (user.is_show_face == true) {
			pokemon.image = '/images/profile/64070011.png';
		} else {
			pokemon.image = pokemonInfo.sprites.other.home.front_default;
		}
		pokemon.lvl = Math.floor(pokemonInfo.base_experience / 10);
		pokemon.hp.max = Math.floor(pokemonInfo.stats[0].base_stat * pokemon.lvl);
		pokemon.hints = userPokemon.hints;
		pokemon.is_show_face = user.is_show_face;
		pokemon.hp.remain = pokemon.hp.max - (pokemon.hp.max / 8) * pokemon.hints.length;
		pokemon.element = capitalize(pokemonInfo.types[0].type.name);
		pokemon.atk =
			pokemonInfo.stats[1].base_stat + pokemonInfo.stats[1].base_stat * 0.5 * pokemon.lvl;
		pokemon.def =
			pokemonInfo.stats[2].base_stat + pokemonInfo.stats[2].base_stat * 0.5 * pokemon.lvl;
	});
</script>

<svelte:head>
	<title>SAIRAHUT - Profile</title>
</svelte:head>

<Pokedex data={pokemon} noti={true} />
