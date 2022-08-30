<script>
	import { put, get } from '$lib/api';
	import { onMount } from 'svelte';
	import notification from '././../../../stores/notification';
	let data = [];

	onMount(async () => {
		data = await get('/api/senior', window.localStorage.getItem('token'));
	});

	let saveWanted = async (item) => {
		const res = await put(
			'/api/senior/wanted',
			{ std_id: item.std_id, wanted: !item.wanted },
			window.localStorage.getItem('token')
		);
		if (res == 'success') {
			notification.pushNoti('success', 'ระบบ', `บันทึกแล้ว`, 2000);
		}
	};
</script>

<svelte:head>
  <title>SAIRAHUT.BACK - Wanted</title>
</svelte:head>

<div class="px-5">
	<table class="w-full">
		<thead class="bg-red-600 text-white">
			<th>ลำดับ</th>
			<th>รหัสนักศึกษา</th>
			<th>ชื่อ</th>
			<th>โดนจับยัง?</th>
		</thead>
		<tbody>
			{#if data.length == 0}
				<tr>
					<td colspan="4" class="text-center">ไม่มีข้อมูล</td>
				</tr>
			{:else}
				{#each data as item, index}
					<tr
						class="text-center {index % 2 == 0
							? ''
							: 'bg-slate-50'} hover:bg-slate-200 transition-all"
					>
						<td>
							{index + 1}
						</td>
						<td>
							{item.std_id}
						</td>
						<td>
							{item.std_name}
						</td>
						<td>
							<input
								type="checkbox"
								on:change={saveWanted(item)}
								bind:checked={item.wanted}
								class="w-full"
							/>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
