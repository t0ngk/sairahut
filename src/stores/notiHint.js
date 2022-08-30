import { writable } from 'svelte/store';
import { browser } from '$app/env';
import notification from './notification';

// const stored = JSON.parse(localStorage.getItem('hints'));
let oldHints = writable(browser ? JSON.parse(localStorage.getItem('hints')) : []);

oldHints.reWrite = (newData) => {
	oldHints.update(() => [...newData]);
	localStorage.setItem('hints', JSON.stringify(newData));
};

oldHints.newHint = (data = [], checkData = []) => {
	if (data !== null && checkData !== null) {
		const newData = [...data];
		const newCheckData = [...checkData];
		const diffData = newData
			.filter((x) => !newCheckData.includes(x))
			.concat(newCheckData.filter((x) => !newData.includes(x)));
		if (browser && !diffData.includes('กำลังแปลงร่างเป็นโปรเกม่อนตัวอื่น') && diffData.length > 0) {
			notification.pushNoti(
				'success',
				'New Hint',
				'คำใบ้ใหม่มาแล้วจ้าาา ดูคำใบ้ใหม่แล้วตามหาพี่รหัสกัน! ✨💖',
				5000
			);
		}
		return diffData;
	}
	return [];
};

export default oldHints;
