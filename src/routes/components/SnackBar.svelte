<script>
	import notification from '../../stores/notification';

	export const color = {
		success: '#4FAB40',
		error: '#F20C32',
		warning: '#F5A623',
		info: '#777777'
	};
	export const icon = {
		success:
			'M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z',
		error:
			'M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z',
		warning:
			'M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z',
		info: 'M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z'
	};
	export let noti = [];
	export let show = false;
	notification.subscribe((data) => {
		noti = data;
		if (noti.length > 0) {
			show = true;
			setTimeout(() => {
				show = false;
			}, data[0].duration);
		}
	});
</script>

<div class="fixed w-full z-10 top-0 h-fit pointer-events-none">
	<div class="w-full max-w-[824px] h-full p-3 mx-auto">
		<div
			class="w-full pointer-events-auto bg-[rgba(221,221,221,0.3)] backdrop-blur-sm shadow-xl rounded-lg p-3 overflow-hidden {show
				? ''
				: 'translate-y-[calc(-120%)]'} transition-transform"
		>
			{#if noti.length > 0}
				<div class="text-sm flex justify-start items-center" style="color: {color[noti[0].type]};">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="13"
						height="13"
						viewBox="0 0 512 512"
						fill={color[noti[0].type]}
					>
						<path d={icon[noti[0].type]} />
					</svg>
					<div class="ml-[5.5px] tracking-wide">{noti[0].title}</div>
				</div>
				<div class="text-[#424242]">
					{noti[0].message}
				</div>
			{/if}
		</div>
	</div>
</div>
