<script>
	import Pokedex from '../components/pokedex.svelte';
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
