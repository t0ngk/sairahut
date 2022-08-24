<script>
	import GoogleAuth from "../components/GoogleAuth.svelte";
</script>

<div class="m-5">
	<div class="text-3xl font-bold py-1">โปรดเข้าสู่ระบบ</div>
	<div class="text-lg text-[#616573]">ใช้อีเมลสถาบันในการเข้าสู่ระบบ</div>
</div>
<div class="h-[375px] bg-[#F3F7FA] flex justify-center items-center">
	<GoogleAuth clientId="383424533241-9hq52ncm5o1s0sp6lgu70f28mickgnn6.apps.googleusercontent.com" on:auth-success={e => console.dir(e.detail.user)} on:init-error={e => console.log(e)} />
</div>
