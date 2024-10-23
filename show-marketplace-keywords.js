// ==UserScript==
// @name         SL Marketplace Keywords
// @namespace    https://github.com/LittleBitwise/
// @version      1.0
// @description  Displays product keywords in product description.
// @author       LittleBitwise
// @match        https://marketplace.secondlife.com/p/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=secondlife.com
// @grant        none
// ==/UserScript==

'use strict';

(() => {
	let keywords = getKeywords();
	let keywordElement = createKeywordElement(keywords);

	let productDescription = getProductDescription();
	productDescription.prepend(keywordElement);
})();


// Utility functions


function getKeywords() {
	let keywords = document.head.querySelector('meta[name=keywords]')?.content ?? '';

	return keywords.split(/, */);
}

function createKeywordElement(keywords) {
	let strong = document.createElement('strong');
	strong.innerHTML = keywords.filter(n => n).join(', ');

	let p = document.createElement('p');
	p.appendChild(strong);

	return p;
}

function getProductDescription() {
	const result = document.querySelector('#product-description');

	return result;
}
