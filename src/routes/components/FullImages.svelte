<script>
	export let src = '';
	export let dialog = false;
</script>

<div
	class="fixed w-screen h-screen flex justify-center items-center bg-[#00000091] top-0 left-0 z-50 overflow-hidden backdrop-blur-sm transition-opacity
    {dialog ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
	on:click={() => (dialog = false)}
>
	<img class="w-full h-full" {src} alt="" style="object-fit: contain;" />
</div>
