<script>
	import { goto } from '$app/navigation';
</script>

<div class="navbar w-full sticky top-0 left-0 h-16 px-5 flex items-end mb-5 bg-white">
	<div
		class="w-full flex justify-between items-center border-b-2 pb-2 px-2 border-[#1B3176] text-[#111C43] text-lg"
	>
		<div
			class="font-bold flex items-center justify-start rounded-xl transition-transform hover:translate-y-[-2px] hover:scale-105"
			href="/admin"
		>
			<img class="animate-spin mr-1 w-4 h-4" src="/icons/pokeball.png" alt="logo" />
			SAIRAHUT.BACK
		</div>
		<div>
			<ul class="flex gap-4">
				<li class="font-semibold text-gray-800 cursor-pointer" on:click={() => goto('/admin')}>Assign poke</li>
				<li class="font-semibold text-gray-800 cursor-pointer" on:click={() => goto('/admin/add')}>Add hint</li>
			</ul>
		</div>
	</div>
</div>
