// ==UserScript==
// @name         Ignore Annoying Threads
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Adds an option to ignore threads by title, which should not be displayed in discovery feeds. Todo: Undo ignores without manually clearing LocalStorage.
// @author       LittleBitwise
// @match        https://community.secondlife.com/discover/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=secondlife.com
// @grant        none
// ==/UserScript==

'use strict';

const LOCAL_STORAGE_KEY = 'ignoredTitles';
const IGNORE_BUTTON_CLASS = 'ipsTag_prefix';
const IGNORE_BUTTON_TEXT = 'Ignore';

function getItems() {
	return document.querySelectorAll(
		'li.ipsStreamItem'
	);
}

function isIgnoredCheck(title) {
	let storage = localStorage.getItem(LOCAL_STORAGE_KEY);

	return storage?.includes(title) ?? false;
}

function addToIgnore(title, item) {
	let storage = localStorage.getItem(LOCAL_STORAGE_KEY);

	//console.log('storage was', storage);

	if (storage) {
		storage = JSON.parse(storage);
		storage.push(title);
	} else {
		storage = [title];
	}

	//console.log('storage now', storage);

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
	item.remove();
}

function createButton(title, item) {
	let button = document.createElement('button');
	button.addEventListener('click', () => addToIgnore(title, item));
	button.classList.add(IGNORE_BUTTON_CLASS);
	button.textContent = IGNORE_BUTTON_TEXT;
	button.style.marginTop = '10px';

	return button;
}

getItems().forEach((item) => {
	let title = item.childNodes[1].childNodes[1].childNodes[5].childNodes[1].childNodes[3].childNodes[1].childNodes[0].textContent;

	let isIgnored = isIgnoredCheck(title);

	if (isIgnored) {
		console.log('Ignored', title);
		item.remove();
	} else {
		item.appendChild(createButton(title, item));
	}
})
