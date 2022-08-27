<script>
	import { get, post } from '$lib/api';
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
  import notification from '././../../stores/notification';
	import { covertToPokemonName } from '$lib/utils'
	let table_data = [];

	afterNavigate(() => {
		if (!window.localStorage.getItem('token')) {
			goto('/login');
			return;
		}
	});

	onMount(async () => {
		table_data = await get('/api/junior');
		const token = await window.localStorage.getItem('token');
		if (!token) {
			goto('/login');
			return;
		}
		const { user } = await get('/api/auth/profile', token);
		if (user.std_id.startsWith('65')) {
			goto('/');
		}
		if (user == undefined) { return }
	});

	let savePokemon = async (data, index) => {
		const token = await window.localStorage.getItem('token');
		if (!token) {
			goto('/login');
			return;
		}
		const { std_id, pokemon_id } = data;
    const newPokemon = await post(`/api/junior/${std_id}/addPokemon/`,{pokemon_id}, token);
    if (newPokemon == "Pokemon not found") {
      notification.pushNoti('error', 'ข้อผิดพลาดขณะบันทึกค่า', 'ไม่พบรหัสโปรเกม่อนที่กรอกมา', 2000);
      return;
    }
		if (newPokemon == "Missing Permission") {
			notification.pushNoti('warning', 'ระบบ', 'นี่ไม่ใช่ที่ของเรานะเด็กๆ', 2000);
      return;
		}
    table_data[index] = newPokemon;
		notification.pushNoti('success', 'ระบบ', 'บันทึกสำเร็จ', 2000);
	};
</script>

<svelte:head>
	<title>SAIRAHUT.BACK</title>
</svelte:head>

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
							<td class="">{covertToPokemonName(data.pokemon_name)}</td>
						{/if}

						<td class="">
							<button
								class=" bg-blue-500 rounded hover:bg-blue-800 px-5 text-white transition"
								on:click={savePokemon(data, index)}>Save</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
