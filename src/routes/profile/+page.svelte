<script>
import { afterNavigate, goto } from '$app/navigation';
	import Pokedex from '../components/pokedex.svelte';
	afterNavigate(() => {
		if (!window.localStorage.getItem('token')) {
			goto('/login');
		}
	});
</script>

<Pokedex
	data={{
		name: 'Pikachu',
		image: 'https://www.pngmart.com/files/2/Pikachu-PNG-Transparent-Image.png',
		element: 'Electric',
		lvl: 24,
		hp: { remain: 60, max: 100 },
		def: 35,
		atk: 50,
		hints: ['หล่อเท่สุด', 'เหล่ท่อสุด']
	}}
/>
<button class=" m-4 bg-red-600 rounded-sm text-white " on:click={() => {window.localStorage.removeItem('token'); goto('/')}}>
	Logout (Dev Button)
</button>
