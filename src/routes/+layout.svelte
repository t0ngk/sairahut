<script>
	import '../app.postcss';
	import Navbar from './components/navbar.svelte';
	import SnackBar from './components/SnackBar.svelte';
	import NavbarAdmin from './components/navbarAdmin.svelte';
	import { page } from '$app/stores';
</script>

{#if $page.url.pathname.slice(0, 6) !== '/admin' && $page.url.pathname.slice(0, 4) !== '/all'}
	<SnackBar />
	<div class="mx-auto max-w-[824px]">
		<Navbar />
		<slot />
	</div>
{:else if $page.url.pathname.slice(0, 6) === '/admin'}
	<SnackBar />
	<NavbarAdmin />
	<slot />
{:else}
	<Navbar />
	<slot />
{/if}
