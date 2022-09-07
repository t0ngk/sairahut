<script>
  
  import QRCode from 'qrcode';
  import { onMount } from 'svelte';
  import { invalidate, goto } from '$app/navigation';
  import { browser } from '$app/environment'
  import {get} from '$lib/api'

  if (browser) {    
    invalidate(() => {
      if (!window.localStorage.getItem('token')) {
        goto('/login');
        return;
      }
    });
  };

  let qrCodeElement = "";
	const generateQR = async (text) => {
    try {
      return await QRCode.toCanvas(qrCodeElement, text, {
        width: screen.width * 0.50,
        margin: 0,
        color: {
          dark: '#111C43',
          light: '#00000000',
        },
      });
		} catch (err) {
      console.error(err);
		}
	};
  
  onMount(async () => {
    const qrCodeUrl = await get('/api/auth/profile/qrcode', window.localStorage.getItem('token'));
    if (qrCodeUrl.status == 400) {
      window.location.href = '/';
      return;
    }
    await generateQR(qrCodeUrl);
  });
</script>


<canvas class="mx-auto" bind:this="{qrCodeElement}" ></canvas>
