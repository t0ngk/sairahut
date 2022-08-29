<script>
	import { page } from '$app/stores';
	import { get, put } from '$lib/api';
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

	const addHint = async (hintNumber) => {
		const updatedStatus = await put(
			'/api/pokedex/addhint',
			{ hintNumber },
			window.localStorage.getItem('token')
		);

		console.log(updatedStatus);
	};

	$: getHintData, display();
</script>

<div class="px-5">
	<h1 class="mb-2">เพิ่มคำใบ้ทั้ง 6</h1>
	<div class="w-full overflow-x-auto h-[60vh]">
		<table class="bg-slate-50">
			<thead class="bg-slate-400 shadow border-b-2 sticky top-0 left-0 pt-[12em]">
				<th class="text-center py-2 border-x">ลำดับ</th>
				<th class="text-center py-2 border-x">รหัส นศ.</th>
				<th class="text-center py-2 border-x">ชื่อ-นามสกุล</th>
				<th class="text-center py-2 border-x min-w-[10em]">ไอดีโปเกม่อน</th>
				<th class="text-center py-2 border-x">คำใบ้ 1</th>
				<th class="text-center py-2 border-x">คำใบ้ 2</th>
				<th class="text-center py-2 border-x">คำใบ้ 3</th>
				<th class="text-center py-2 border-x">คำใบ้ 4</th>
				<th class="text-center py-2 border-x">คำใบ้ 5</th>
				<th class="text-center py-2 border-x">คำใบ้ 6</th>
			</thead>
			<tbody>
				{#each getHintData as seniorData, i}
					<tr class={`${i % 2 == 0 ? 'bg-slate-200' : ''}`}>
						<td class="px-4">{i + 1}</td>
						<td class="px-4">{seniorData.std_id}</td>
						<td class="px-4">{seniorData.name}</td>
						<td class="px-4">{seniorData.pokemon_id}</td>
						<td class="px-4">{seniorData.hint_1}</td>
						<td class="px-4">{seniorData.hint_2}</td>
						<td class="px-4">{seniorData.hint_3}</td>
						<td class="px-4">{seniorData.hint_4}</td>
						<td class="px-4">{seniorData.hint_5}</td>
						<td class="px-4">{seniorData.hint_6}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="mt-4 bg-slate-100 p-4">
		<button on:click={() => addHint(0)} class="px-4 py-2 bg-blue-400 text-white rounded"
			>เคีลยร์คำใบ้ทั้งหมด</button
		>
		<button on:click={() => addHint(1)} class="px-4 py-2 bg-blue-400 text-white rounded"
			>เพิ่ม hint ชุดที่ 1</button
		>
		<button on:click={() => addHint(2)} class="px-4 py-2 bg-blue-400 text-white rounded">เพิ่ม hint ชุดที่ 2</button>
		<button on:click={() => addHint(3)} class="px-4 py-2 bg-blue-400 text-white rounded">เพิ่ม hint ชุดที่ 3</button>
		<button on:click={() => addHint(4)} class="px-4 py-2 bg-blue-400 text-white rounded">เพิ่ม hint ชุดที่ 4</button>
		<button on:click={() => addHint(5)} class="px-4 py-2 bg-blue-400 text-white rounded">เพิ่ม hint ชุดที่ 5</button>
		<button on:click={() => addHint(6)} class="px-4 py-2 bg-blue-400 text-white rounded">เพิ่ม hint ชุดที่ 6</button>
	</div>
</div>
