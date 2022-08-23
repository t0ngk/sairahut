<script>
	import { page } from '$app/stores';
	import Pokedex from '../../components/pokedex.svelte';
	const slug = $page.params.slug;
</script>

<Pokedex
	data={{
		name: 'Zenigame',
		image: 'https://th.portal-pokemon.com/play/resources/pokedex/img/pm/5794f0251b1180998d72d1f8568239620ff5279c.png',
		element: 'water',
		lvl: 24,
		hp: { remain: 60, max: 100 },
		def: 35,
		atk: 50,
		hints: ['หล่อเท่สุด', 'เหล่ท่อสุด']
	}}
/>
