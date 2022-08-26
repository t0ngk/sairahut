<script>
	import { page } from '$app/stores';
	import {goto} from '$app/navigation'
	let y;

	// const showY = () => {
	// 	console.log(y)
	// }
	
	// $: y , showY()
</script>

<svelte:window bind:scrollY={y} />
<div class={`${y > 25 ? "pt-4" : "pt-8"} bg-white w-full px-5 flex items-end mb-5 sticky top-0 left-0 z-20 transition-all duration-200 ease-out`}>
	<div
		class={` ${y > 25 ? "pb-3" : "pb-6"} w-full flex justify-between items-center border-b-2 px-2 border-[#1B3176] text-[#111C43] text-lg`}
	>
		<div class="font-bold flex items-center justify-start rounded-xl transition-transform hover:translate-y-[-2px] hover:scale-105"
		on:click={() => goto('/')}>
			<img class="animate-spin mr-1 w-4 h-4" src="/icons/pokeball.png" alt="logo" />
			SAIRAHUT
        </div>
		<div class="relative flex justify-start items-center">
			<div class="w-8 transition-transform hover:translate-y-[-2px] hover:scale-105" on:click={() => goto('/profile')}>
				<svg
					class="mx-auto {$page.url.pathname === '/profile'
						? 'stroke-[#f20c32]'
						: 'stroke-[#101C43]'}"
					width="15"
					height="17"
					viewBox="0 0 15 17"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11.4422 4.30159C11.4422 5.17722 11.0695 6.01699 10.4061 6.63616C9.74271 7.25533 8.84295 7.60317 7.90477 7.60317C6.96659 7.60317 6.06683 7.25533 5.40344 6.63616C4.74005 6.01699 4.36736 5.17722 4.36736 4.30159C4.36736 3.42595 4.74005 2.58618 5.40344 1.96701C6.06683 1.34784 6.96659 1 7.90477 1C8.84295 1 9.74271 1.34784 10.4061 1.96701C11.0695 2.58618 11.4422 3.42595 11.4422 4.30159V4.30159ZM7.90477 10.0794C6.26295 10.0794 4.68838 10.6881 3.52744 11.7716C2.3665 12.8552 1.71429 14.3248 1.71429 15.8571H14.0952C14.0952 14.3248 13.443 12.8552 12.2821 11.7716C11.1212 10.6881 9.54659 10.0794 7.90477 10.0794V10.0794Z"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div class="w-8 transition-transform hover:translate-y-[-2px] hover:scale-105" on:click={() => goto('/collection')}>
				<svg
					class="mx-auto {$page.url.pathname === '/collection'
						? 'stroke-[#f20c32]'
						: 'stroke-[#101C43]'}"
					width="17"
					height="17"
					viewBox="0 0 17 17"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.14287 2.85714C1.14287 2.3646 1.33853 1.89223 1.68681 1.54394C2.03509 1.19566 2.50747 1 3.00001 1H4.85715C5.3497 1 5.82207 1.19566 6.17035 1.54394C6.51863 1.89223 6.7143 2.3646 6.7143 2.85714V4.71429C6.7143 5.20683 6.51863 5.6792 6.17035 6.02748C5.82207 6.37577 5.3497 6.57143 4.85715 6.57143H3.00001C2.50747 6.57143 2.03509 6.37577 1.68681 6.02748C1.33853 5.6792 1.14287 5.20683 1.14287 4.71429V2.85714ZM10.4286 2.85714C10.4286 2.3646 10.6242 1.89223 10.9725 1.54394C11.3208 1.19566 11.7932 1 12.2857 1H14.1429C14.6354 1 15.1078 1.19566 15.4561 1.54394C15.8043 1.89223 16 2.3646 16 2.85714V4.71429C16 5.20683 15.8043 5.6792 15.4561 6.02748C15.1078 6.37577 14.6354 6.57143 14.1429 6.57143H12.2857C11.7932 6.57143 11.3208 6.37577 10.9725 6.02748C10.6242 5.6792 10.4286 5.20683 10.4286 4.71429V2.85714ZM1.14287 12.1429C1.14287 11.6503 1.33853 11.1779 1.68681 10.8297C2.03509 10.4814 2.50747 10.2857 3.00001 10.2857H4.85715C5.3497 10.2857 5.82207 10.4814 6.17035 10.8297C6.51863 11.1779 6.7143 11.6503 6.7143 12.1429V14C6.7143 14.4925 6.51863 14.9649 6.17035 15.3132C5.82207 15.6615 5.3497 15.8571 4.85715 15.8571H3.00001C2.50747 15.8571 2.03509 15.6615 1.68681 15.3132C1.33853 14.9649 1.14287 14.4925 1.14287 14V12.1429ZM10.4286 12.1429C10.4286 11.6503 10.6242 11.1779 10.9725 10.8297C11.3208 10.4814 11.7932 10.2857 12.2857 10.2857H14.1429C14.6354 10.2857 15.1078 10.4814 15.4561 10.8297C15.8043 11.1779 16 11.6503 16 12.1429V14C16 14.4925 15.8043 14.9649 15.4561 15.3132C15.1078 15.6615 14.6354 15.8571 14.1429 15.8571H12.2857C11.7932 15.8571 11.3208 15.6615 10.9725 15.3132C10.6242 14.9649 10.4286 14.4925 10.4286 14V12.1429Z"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			{#if $page.url.pathname === '/profile' || $page.url.pathname === '/collection'}
				<div
					class="slide w-1/2 absolute bottom-[-4px] transition-transform ease-in-out
                    {$page.url.pathname === '/profile' ? 'translate-x-0' : 'translate-x-full'}"
				>
					<div class="w-6 bg-[#f20c32] h-[2px] rounded-xl mx-auto" />
				</div>
			{/if}
		</div>
	</div>
</div>
