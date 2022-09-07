<script>
	import GoogleAuth from '../components/GoogleAuth.svelte';
	import { post } from '$lib/api';
	import { afterNavigate, goto } from '$app/navigation';
	import notification from '../../stores/notification';
	afterNavigate(() => {
		if (window.localStorage.getItem('token')) {
			goto('/profile');
		}
	});

	let login = async (token) => {
		let response = await post('/api/auth', { token });
		if (response == 'Please use @kmitl.ac.th') {
			notification.pushNoti(
				'warning',
				'เข้าสู่ระบบล้มเหลว',
				'กรุณาเข้าสู่ระบบด้วยอีเมลสถาบัน แล้ว ปิดเปิดแอปใหม่อีกครั้ง 🥹',
				4000
			);
			setTimeout(() => {
				goto('https://accounts.google.com/AddSession?hl=en&continue=https://www.google.com');
			}, 4000);
			return;
		}
		window.localStorage.setItem('token', response.token);
		window.location.reload();
	};
</script>

<svelte:head>
	<title>SAIRAHUT - Login</title>
</svelte:head>

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
			notification.pushNoti(
				'error',
				'Error',
				'Something went wrong. please contact administrator',
				4000
			);
			console.log(e);
		}}
	/>
</div>
