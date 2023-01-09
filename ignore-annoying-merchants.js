// ==UserScript==
// @name         Ignore Annoying Merchants
// @namespace    https://github.com/LittleBitwise/
// @version      0.5
// @description  Adds an option to hide products from merchants by clicking their name on the search result page. Todo: Ignores can only be undone by manually editing LocalStorage.
// @author       LittleBitwise
// @match        https://marketplace.secondlife.com/products/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=secondlife.com
// @grant        none
// ==/UserScript==

'use strict';

const LOCAL_STORAGE_KEY = 'ignoredMerchants';

// Page main element selector
function selectedElements() {
	let result = document.querySelectorAll(
		'.gallery-item'
	);

	return result;
}

// Process each main element
selectedElements().forEach((element) => {
	let merchantElement = element.querySelector('.item-description > p.small');

	merchantElement.style.overflow = 'visible';
	merchantElement = merchantElement.querySelector('span');

	if (merchantElement === null) {
		return;
	}

	let merchant = merchantElement.textContent;

	let isIgnored = isIgnoredCheck(merchant);

	if (isIgnored) {
		element.remove();
	} else {
		merchantElement.style.color = '#b15c5c';
		merchantElement.style.cursor = 'pointer';
		merchantElement.addEventListener('click', () => addToIgnore(merchant, element));
	}
})


// Utility functions


function isIgnoredCheck(merchant) {
	let storage = localStorage.getItem(LOCAL_STORAGE_KEY);

	return storage?.includes(merchant) ?? false;
}

function addToIgnore(merchant, element) {
	let storage = localStorage.getItem(LOCAL_STORAGE_KEY);

	if (storage) {
		storage = JSON.parse(storage);
		storage.push(merchant);
	} else {
		storage = [merchant];
	}

	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storage));

	// Delete all existing elements
	selectedElements().forEach((element) => {
		let span = element.querySelector('.item-description > p > span');

		let name = span.textContent;

		if (name == merchant) {
			element.remove();
		}
	})
}
