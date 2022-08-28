<script>
	import { page } from '$app/stores';
    import {get, post} from "$lib/api"
    import {onMount} from "svelte"
	import { afterNavigate, goto } from '$app/navigation';
    let seniorsProfile = [];

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
		if (user.std_id.startsWith('65')) {
			goto('/');
		}
		if (user == undefined) {
			return;
		}
        /////////////////////////////////////////////////////

		seniorsProfile = await get('/api/senior');
	});

    const display  = () => {
        console.log(seniorsProfile)
    }

    $: seniorsProfile , display()
</script>

<div class="px-5">
	<p>Add hints here 🎇</p>
</div>
