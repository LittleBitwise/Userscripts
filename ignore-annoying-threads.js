// ==UserScript==
// @name         Ignore Annoying Threads
// @namespace    https://github.com/LittleBitwise/
// @version      0.5
// @description  Adds an option to ignore threads by title, which should not be displayed in discovery feeds. Todo: Undo ignores without manually clearing LocalStorage.
// @author       LittleBitwise
// @match        https://community.secondlife.com/discover/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=secondlife.com
// @grant        none
// ==/UserScript==

'use strict';

const LOCAL_STORAGE_KEY = 'ignoredTitles';
const IGNORE_BUTTON_CLASS = 'ipsTag_prefix';
const IGNORE_BUTTON_TEXT = 'Ignore';

// Main element selector
function selectedElements() {
	let result = document.querySelectorAll(
		'li.ipsStreamItem'
	);

	return result;
}

// Process each main element
selectedElements().forEach((element) => {
	let title = element.querySelector('.ipsStreamItem_header .ipsContained > a').textContent;

	let isIgnored = isIgnoredCheck(title);

	if (isIgnored) {
		element.remove();
	} else {
		element.appendChild(createButton(title, element));
	}
})


// Utility functions


function isIgnoredCheck(title) {
	let storage = localStorage.getItem(LOCAL_STORAGE_KEY);

	storage = JSON.parse(storage);

	if (storage) {
		return storage?.includes(title) ?? false;
	}

	return false;
}

function addToIgnore(title, element) {
	let storage = localStorage.getItem(LOCAL_STORAGE_KEY);

	if (storage) {
		storage = JSON.parse(storage);
		storage.push(title);
	} else {
		storage = [title];
	}

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));
	element.remove();
}

function createButton(title, element) {
	let button = document.createElement('button');

	button.addEventListener('click', () => addToIgnore(title, element));
	button.classList.add(IGNORE_BUTTON_CLASS);
	button.textContent = IGNORE_BUTTON_TEXT;
	button.style.marginTop = '10px';

	return button;
}
