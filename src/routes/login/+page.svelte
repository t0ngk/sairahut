<script>
	import GoogleAuth from '../components/GoogleAuth.svelte';
	import { post } from '$lib/api';
	import { afterNavigate, goto } from '$app/navigation';

	afterNavigate(() => {
		if (window.localStorage.getItem('token')) {
			goto('/');
		}
	});

	let login = async (token) => {
		let response = await post('/api/auth', { token });
		if (response == 'Please use @kmitl.ac.th') {
			alert('กรุณาเข้าสู่ระบบด้วยอีเมลสถาบัน แล้ว ปิดเปิดแอปใหม่อีกครั้ง 🥹');
			goto('https://accounts.google.com/');
			return;
		}
		window.localStorage.setItem('token', response.token);
		goto('/profile');
	};
</script>

<div class="m-5">
	<div class="text-3xl font-bold py-1">โปรดเข้าสู่ระบบ</div>
	<div class="text-lg text-[#616573]">ใช้อีเมลสถาบันในการเข้าสู่ระบบ</div>
</div>
<div class="h-[375px] bg-[#F3F7FA] flex justify-center items-center">
	<GoogleAuth
		clientId="383424533241-9hq52ncm5o1s0sp6lgu70f28mickgnn6.apps.googleusercontent.com"
		on:auth-success={(e) => {
			login(e.detail.token);
		}}

		on:auth-failure={(e) => {
			alert("Error")
			console.log(e);
		}}
	/>
</div>
