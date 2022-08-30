import { writable } from 'svelte/store';
import { browser } from '$app/env';

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
		return diffData;
	}
	return [];
};

export default oldHints;
