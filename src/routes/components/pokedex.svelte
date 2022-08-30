<script>
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	let showHint = false;
	export let data;
	export let noti;
	import { circOut } from 'svelte/easing';
import { element } from 'svelte/internal';
	import { tweened } from 'svelte/motion';
	import notiHint from '../../stores/notiHint';
	const progress = tweened(0, {
		delay: 1000,
		duration: 2250,
		easing: circOut
	});

	$: {
		progress.set(data.hp.remain / data.hp.max);
	}

	onMount(() => {
		const tl = gsap.timeline({});

		tl.from('#stat-wrapper', {
			yPercent: 25,
			opacity: 0,
			ease: 'back'
		})
			.from(
				'.stats',
				{
					opacity: 0,
					yPercent: 30,
					stagger: 0.1
				},
				'<+=0.5'
			)
			.from(
				'#max-hp',
				{
					height: '2em',
					duration: 1
				},
				'<'
			)
			.from(
				'#current-hp',
				{
					width: 0,
					duration: 1,
					ease: 'steps(1000)'
				},
				'<'
			);

		gsap.from('#poke-image', {
			// Pokemon image moving
			xPercent: 'random(-20, 20)',
			yPercent: 'random(-20, 20)',
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut',
			duration: 1
		});
	});

	const bgColor = {
		"normal": "bg-[#9099A1]",
		"fighting":"bg-[#CE4069]",
		"flying":"bg-[#92AADE]",
		"poison":"bg-[#AB6AC8]",
		"ground":"bg-[#D97746]",
		"rock":"bg-[#C7B78B]",
		"bug":"bg-[#90C12C]",
		"ghost":"bg-[#5269AC]",
		"steel":"bg-[#5A8EA1]",
		"fire":"bg-[#FF9C54]",
		"water":"bg-[#4D90D5]",
		"grass":"bg-[#63BB5B]",
		"electric":"bg-[#F3D23B]",
		"psychic":"bg-[#F97176]",
		"ice":"bg-[#74CEC0]",
		"dragon":"bg-[#096DC4]",
		"dark":"bg-[#5A5366]",
		"fairy":"bg-[#EC8FE6]"
	}
</script>

<div class="m-5">
	<div class="text-3xl font-bold py-1 flex mb-2">
		<span class="border-b-2 border-[#f20c32] mr-2">Pokedex</span>
		<img class="w-9" src="/images/pokedex.png" alt="pokedex" />
	</div>
	<div class="text-md text-[#616573]">
		Wild {data.name} appeared! <br />
		นี่คือโปเกม่อนที่ต้องตามหา
	</div>
	<div class="h-[375px] flex justify-center items-center relative">
		<div class={`${bgColor[data.element.toLowerCase()] || "bg-neutral-100"} w-[222px] h-[222px] rounded-full flex justify-center items-center`}>
			<img id="poke-image" class="{data.is_show_face ? 'rounded-full' : ''}" style="w-full" src={data.image} alt="pokemon" />
		</div>
		<div class="stats absolute bottom-0 right-0 text-[#616573]">{data.element}</div>
	</div>
</div>
<div id="stat-wrapper" class="bg-[#F3F7FA] p-5 min-h-[calc(100vh-581px)]">
	<div
		class="stats text-2xl font-bold flex justify-between items-center border-b-2 boder-[#869EAF] pb-2"
	>
		<div>
			<span class="text-[#101C43] inline">{data.name}</span>
			<span>
				<svg
					on:click={() => {
						console.log('Redirect to : ' + 'https://pokemon.gameinfo.io/th/pokemon/' + data.name);
					}}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5 inline-block mb-2 text-blue-600"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
					/>
				</svg>
			</span>
		</div>
		<span class="text-[#616573]">Lv.{data.lvl}</span>
	</div>
	<div class="text-[#616573] mb-7">
		<div class="my-3">
			<div class="stats ">{data.hp.remain}/{data.hp.max}</div>
			<div id="max-hp" class="stats w-full bg-[#bebfc2] h-2 rounded-sm relative overflow-hidden">
				<!-- <div
					id="current-hp"
					class="bg-gradient-to-r from-[#4FAB40] to-[#318F22] h-full"
					style="width: {(data.hp.remain / data.hp.max) * 100}%"
				/> -->
				<progress
					value={$progress}
					class="bg-gradient-to-r from-[#4FAB40] to-[#318F22] w-full absolute top-0"
				/>
			</div>
		</div>
		<div class="stats  flex justify-between items-center">
			<div>Attack</div>
			<div>{data.atk}</div>
		</div>
		<div class="stats  flex justify-between items-center">
			<div>Defense</div>
			<div>{data.def}</div>
		</div>
	</div>
	<div class="stats  bg-[#ECF3F9] rounded-md p-2">
		{#if noti && notiHint.newHint($notiHint || [], data.hints).length > 0 && !showHint}
			<div class="absolute right-[3px] top-[3px]">
				<span class="flex h-3 w-3">
					<span
						class="relative inline-flex rounded-full h-3 w-3 bg-red-600 border-[2px] border-[#ECF3F9]"
					/>
					<span
						class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"
					/>
				</span>
			</div>
		{/if}
		<div
			class="select-none cursor-pointer w-full h-9 px-2 bg-white hover:bg-slate-50 transition-colors text-[#5592F5] border-2 border-[#5592F5] rounded-md flex justify-between items-center"
			on:click={() => {
				showHint = !showHint;
				if (noti) notiHint.reWrite(data.hints);
			}}
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
					class="mt-2 p-2 bg-white rounded-md h-auto relative flex items-start transition-opacity hintBox gap-2"
					style="min-height: 48px;"
				>
					<div
						class="my-[5.5px] w-5 h-5 rounded-full bg-[#E4EBF0] flex justify-center items-center p-1 text-xs"
					>
						{i + 1}
					</div>
					<div
						class="my-[4px] flex justify-start items-center relative"
						style="min-height: 20px; width: calc(100% - 20px - 16px)"
					>
						<div class="w-full break-words">
							{hint}
						</div>
					</div>
				</div>
			{/each}
			{#if data.hints.length === 0}
				<div
					class="mt-2 p-2 bg-white rounded-md h-auto relative flex items-center transition-opacity hintBox justify-center gap-2"
					style="min-height: 48px;"
				>
					ยังไม่มีคำใบ้ รอก่อนนะะ
				</div>
			{/if}
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
