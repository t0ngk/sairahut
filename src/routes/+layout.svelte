<script>
	import '../app.postcss';
	import Navbar from './components/navbar.svelte';
	import SnackBar from './components/SnackBar.svelte';
</script>

<SnackBar />
<div class="mx-auto max-w-[824px]">
	<Navbar />
	<slot />
</div>
