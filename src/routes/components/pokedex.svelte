<script>
	let showHint = false;
	export let data;
</script>

<div class="m-5">
	<div class="text-3xl font-bold py-1 flex mb-2">
		<span class="border-b-2 border-[#f20c32] mr-2">Pokedex</span>
		<img class="w-9" src="/images/pokedex.png" alt="pokedex" />
	</div>
	<div class="text-md text-[#616573]">
		Wild pikachu appeared! <br />
		นี่คือโปเกม่อนที่ต้องตามหา
	</div>
	<div class="h-[375px] flex justify-center items-center relative">
		<div class="w-[222px] h-[222px] rounded-full bg-[#F5F5F5] flex justify-center items-center">
			<img style="w-full" src={data.image} alt="pokemon" />
		</div>
		<div class="absolute bottom-0 right-0 text-[#616573]">{data.element}</div>
	</div>
</div>
<div class="bg-[#F3F7FA] p-5 min-h-[calc(100vh-581px)]">
	<div class="text-2xl font-bold flex justify-between items-center border-b-2 boder-[#869EAF]">
		<span class="text-[#101C43]">{data.name}</span>
		<span class="text-[#616573]">Lv.{data.lvl}</span>
	</div>
	<div class="text-[#616573] mb-7">
		<div class="my-3">
			<div>{data.hp.remain}/{data.hp.max}</div>
			<div class="w-full bg-[#bebfc2] h-2 rounded-sm relative overflow-hidden">
				<div
					class="bg-gradient-to-r from-[#4FAB40] to-[#318F22] h-full"
					style="width: {(data.hp.remain / data.hp.max) * 100}%"
				/>
			</div>
		</div>
		<div class="flex justify-between items-center">
			<div>Attack</div>
			<div>{data.atk}</div>
		</div>
		<div class="flex justify-between items-center">
			<div>Defense</div>
			<div>{data.def}</div>
		</div>
	</div>
	<div class="bg-[#ECF3F9] rounded-md p-2">
		<div
			class="select-none cursor-pointer w-full h-9 px-2 mb-2 bg-white hover:bg-slate-50 transition-colors text-[#5592F5] border-2 border-[#5592F5] rounded-md flex justify-between items-center"
			on:click={() => (showHint = !showHint)}
		>
			<span>คำใบ้</span>
			<span class="transition-transform {showHint ? 'rotate-180' : ''}">
				<svg
					width="12"
					height="7"
					viewBox="0 0 12 7"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 6L6 0.999999L11 6"
						stroke="#5592F5"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
		</div>
		{#if showHint}
			{#each data.hints as hint, i}
				<div
					class="px-2 bg-white rounded-md h-12 flex items-center transition-opacity hintBox
                    {i + 1 === data.hints.length ? '' : 'my-2'}"
				>
					<div
						class="w-5 h-5 rounded-full bg-[#E4EBF0] flex justify-center items-center p-1 text-xs mr-2"
					>
						{i + 1}
					</div>
					{hint}
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.hintBox {
		animation: fadeIn 0.3s linear;
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
