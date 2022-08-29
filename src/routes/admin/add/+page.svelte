<script>
	import { page } from '$app/stores';
	import { get, post } from '$lib/api';
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	let getHintData = [];

	afterNavigate(() => {
		if (!window.localStorage.getItem('token')) {
			goto('/login');
			return;
		}
	});

	onMount(async () => {
		/* เช็ค Token */
		const token = window.localStorage.getItem('token');
		if (!token) {
			goto('/login');
			return;
		}

		/* Fetch user profile และ ทำการเช็คว่ามีสิทธิ์ขอมั้ย */
		const { user } = await get('/api/auth/profile', token);

		if (String(user.std_id).startsWith('65')) {
			goto('/');
		}
		if (user == undefined) {
			return;
		}
		/////////////////////////////////////////////////////

		getHintData = await get('/api/pokedex/addhint');
	});

	const display = () => {
		console.log(getHintData);
	};

	$: getHintData, display();
</script>

<div class="px-5">
	<h1>เพิ่มคำใบ้ทั้ง 6</h1>
	<table class="bg-slate-50">
		<thead class="pb-2 border-b-2 sticky top-0 left-0 pt-[12em]">
			<th class="text-left">ลำดับ</th>
			<th class="text-left">รหัส นศ.</th>
			<th class="text-left">ชื่อ-นามสกุล</th>
			<th class="text-left">ไอดีโปเกม่อน</th>
			<th class="text-left">คำใบ้ 1</th>
			<th class="text-left">คำใบ้ 2</th>
			<th class="text-left">คำใบ้ 3</th>
			<th class="text-left">คำใบ้ 4</th>
			<th class="text-left">คำใบ้ 5</th>
			<th class="text-left">คำใบ้ 6</th>
			</thead>
		<tbody>
			{#each getHintData as seniorData, i}
				<tr>
					<td class="px-4" >{i+1}</td>
					<td class="px-4" >{seniorData.std_id}</td>
					<td class="px-4" >{seniorData.name}</td>
					<td class="px-4" >{seniorData.pokemon_id}</td>
					<td class="px-4" >{seniorData.hint_1}</td>
					<td class="px-4" >{seniorData.hint_2}</td>
					<td class="px-4" >{seniorData.hint_3}</td>
					<td class="px-4" >{seniorData.hint_4}</td>
					<td class="px-4" >{seniorData.hint_5}</td>
					<td class="px-4" >{seniorData.hint_6}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
