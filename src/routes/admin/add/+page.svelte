<script>
	import { page } from '$app/stores';
	import { get, put } from '$lib/api';
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import notification from '././../../../stores/notification';
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

	const addHint = async (hintNumber) => {
		await put(
			'/api/pokedex/addhint',
			{ hintNumber },
			window.localStorage.getItem('token')
		);

		if (hintNumber != 0) {
			notification.pushNoti('success', 'ระบบ', `เพิ่มคำใบ้ที่ ${hintNumber} ให้ทุกคนแล้ว`, 2000);
		} else {
			notification.pushNoti('success', 'ระบบ', `ล้างคำใบ้ที่มีทั้งหมดแล้ว`, 2000);
		}
	};

	const showFace = async (is_show_face) => {
		await put(
			'/api/senior/setface',
			{ is_show_face },
			window.localStorage.getItem('token')
		);

		if (is_show_face) {
			notification.pushNoti('success', 'ระบบ', `เฉลยหน้าพี่ๆแล้ว โชคดีทุกคน`, 2000);
		} else {
			notification.pushNoti('success', 'ระบบ', `รีบปิดให้ละ 😅`, 2000);
		}
	};
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
	<div class="mt-4 bg-slate-100 p-4 flex justify-between">
		<div>
			<button on:click={() => addHint(0)} class="px-4 py-2 transition-all bg-blue-400 hover:bg-blue-500 active:bg-blue-600 active:scale-95 text-white rounded"
				>เคีลยร์คำใบ้ทั้งหมด</button
			>
			<button on:click={() => addHint(1)} class="px-4 py-2 transition-all bg-blue-400 hover:bg-blue-500 active:bg-blue-600 active:scale-95 text-white rounded"
				>เพิ่ม hint ชุดที่ 1</button
			>
			<button on:click={() => addHint(2)} class="px-4 py-2 transition-all bg-blue-400 hover:bg-blue-500 active:bg-blue-600 active:scale-95 text-white rounded">เพิ่ม hint ชุดที่ 2</button>
			<button on:click={() => addHint(3)} class="px-4 py-2 transition-all bg-blue-400 hover:bg-blue-500 active:bg-blue-600 active:scale-95 text-white rounded">เพิ่ม hint ชุดที่ 3</button>
			<button on:click={() => addHint(4)} class="px-4 py-2 transition-all bg-blue-400 hover:bg-blue-500 active:bg-blue-600 active:scale-95 text-white rounded">เพิ่ม hint ชุดที่ 4</button>
			<button on:click={() => addHint(5)} class="px-4 py-2 transition-all bg-blue-400 hover:bg-blue-500 active:bg-blue-600 active:scale-95 text-white rounded">เพิ่ม hint ชุดที่ 5</button>
			<button on:click={() => addHint(6)} class="px-4 py-2 transition-all bg-blue-400 hover:bg-blue-500 active:bg-blue-600 active:scale-95 text-white rounded">เพิ่ม hint ชุดที่ 6</button>
		</div>
		<div class="flex gap-2">
			<button on:click={() => showFace(true)} class="px-4 py-2 transition-all bg-red-400 hover:bg-red-500 active:bg-red-600 active:scale-95 text-white rounded">เฉลยหน้าพี่รหัส</button>
			<button on:click={() => showFace(false)} class="px-4 py-2 transition-all bg-red-400 hover:bg-red-500 active:bg-red-600 active:scale-95 text-white rounded">กดผิด ปิดคืนที</button>
		</div>
	</div>
</div>
