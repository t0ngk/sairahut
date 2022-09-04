<script>
	import { get } from '$lib/api';
	import { onMount } from 'svelte';
	import Dashboard from '../components/Dashboard.svelte';

	let isError = false;
	let seniorsData = [];

	onMount(async () => {
		const response = await get('/api/senior/huntstatus?id=2', localStorage.getItem('token'));

		if (typeof response.seniorData == 'object') {
			seniorsData = response.seniorData;
		} else {
			console.log(response.message);
			isError = true;
		}
	});
</script>

<div class="m-5">
	{#if isError}
		<div>Error</div>
	{:else if seniorsData.length == 0}
		<div>Loading</div>
	{:else}
		<Dashboard {seniorsData} />
	{/if}
</div>
