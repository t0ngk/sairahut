import { writable } from 'svelte/store';

// Type: success | error | warning | info
const pokemon = writable({});

pokemon.newPokemon = (num, data) => {
	pokemon.update((allPoke) => {
		allPoke[num] = data;
		return allPoke;
	});
};

export default pokemon;
