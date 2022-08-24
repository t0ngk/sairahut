<script>
	import '../app.postcss';
	import Navbar from './components/navbar.svelte';
	
</script>

<div class="mx-auto max-w-[824px]">
	<Navbar />
	<slot />
</div>
