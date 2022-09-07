<script>
	export let data;
</script>

<div class="h-[100%] aspect-square relative {data.wanted ? 'opacity-30' : ''}">
	<div
		class="w-full h-full rounded-xl relative overflow-hidden border-2 border-[#E3E3E3] bg-[#FDFDFD] flex flex-col justify-between"
	>
		<div class="h-4/5 flex justify-center items-center">
			<div
				class="w-[60%] rounded-full p-[3px] border-4 {data.wanted
					? 'border-[#E3E3E3]'
					: 'border-[#F20C32]'} bg-[#FDFDFD] relative"
			>
				<img
					src="/images/profile/{data.std_id}.png"
					alt="senior"
					class="w-full rounded-full aspect-square object-cover overflow-hidden"
				/>
				<div
					class="w-1/2 absolute bottom-0 right-[-10%] border-[3px] {data.wanted
						? 'border-[#E3E3E3]'
						: 'border-[#F20C32]'} rounded-full p-[3px] bg-[#FDFDFD]"
				>
					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.pokemon_id}.png`}
						alt="senior"
						class="w-full rounded-full border-[4px] border-[#5A8EA1] aspect-square object-cover"
					/>
				</div>
			</div>
			<div class="absolute top-0 right-0 m-2">
				{#each Array(data.has_junior - data.junior_found) as _}
					<div class="p-1 mb-1 bg-[#D9D9D9] rounded-full">
						<img src="/icons/pokeball.png" alt="nongong" class="w-5" />
					</div>
				{/each}
				{#each Array(data.junior_found || 0) as _}
					<div class="p-1 mb-1 bg-[#D9D9D9] rounded-full opacity-30">
						<img src="/icons/pokeball.png" alt="nongong" class="w-5" />
					</div>
				{/each}
			</div>
		</div>
		<div
			class="h-1/5  bg-[#F3F7FA] flex justify-center items-center text-[#111C43] font-bold text-xl"
		>
			<span class="max-w-full truncate">
				{data.std_name}
			</span>
		</div>
	</div>
</div>
