import { writable } from 'svelte/store';

// Type: success | error | warning | info
const notiMsg = writable([]);

notiMsg.pushNoti = (type = 'info', title = 'Notification', message = 'Message', duration = 1000) => {
	notiMsg.update((n) => [{ message, title, type, duration }, ...n]);
};

export default notiMsg;
