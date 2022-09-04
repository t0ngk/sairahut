<script>
	export let seniorsData;
</script>

<div>
	{#each seniorsData as senior}
		<div>
			<p>
				{senior.std_name}
			</p>
		</div>
	{/each}
</div>
