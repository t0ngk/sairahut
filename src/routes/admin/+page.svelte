<script>
	import { get } from '$lib/api';
	import { onMount } from 'svelte';
	let table_data = [];

	onMount(async () => {
	  table_data = await get('/api/junior')
	});

  let savePokemon = async () => {
    
  }
</script>

<div class="px-5">
	<div class="w-auto overflow-scroll">
		<table class="w-full">
			<thead>
				<tr class="border-collapse border-b-2 border-red-500">
					<th class="">ลำดับ</th>
					<th class="">รหัส</th>
					<th class="">ชื่อ</th>
					<th class="">รหัสโปรเกม่อน</th>
					<th class="">โปรเกม่อนที่ได้</th>
					<th class="">จัดการ</th>
				</tr>
			</thead>
			<tbody>
        {#if table_data.length == 0}
        <tr class="text-center border-collapse border-b-2 border-red-500 h-[50px]">
          <td colspan="6">ไม่มีข้อมูล</td>
        </tr>
        {/if}
				{#each table_data as data, index}
					<tr class="text-center border-collapse border-b-2 border-red-500 h-[50px]">
						<td class="">{index + 1}</td>
						<td class="">{data.std_id}</td>
						<td class="">{data.std_name}</td>
						<td class=""
							><input
								type="number"
								bind:value={data.pokemon_id}
								class="bg-slate-200 p-2 rounded appearance-none"
							/></td
						>

						{#if data.pokemon_name == null}
							<td> ยังไม่มีโปรเกม่อน </td>
						{:else}
							<td class="">{data.pokemon_name}</td>
						{/if}

						<td class="">
							<button
								class=" bg-blue-500 rounded hover:bg-blue-800 px-5 text-white transition"
								on:click={console.log(data)}>Save</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
