// ==UserScript==
// @name         SL Marketplace Keywords
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Displays product keywords in product description.
// @author       LittleBitwise
// @match        https://marketplace.secondlife.com/p/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=secondlife.com
// @grant        none
// ==/UserScript==

'use strict';

function getProductDescription() {
	return document.querySelector('#product-description');
}

function getKeywords() {
	let keywords = document.head.querySelector('meta[name=keywords]')?.content ?? '';

	//console.log('kw string', keywords);

	return keywords.split(/, */);
}

function createKeywordElement(keywords) {
	let p = document.createElement('p');

	// Clean up CSV tags for display
	p.innerHTML = `<strong>Keywords: ${keywords.filter(n => n).join(', ')}</strong>`;

	return p;
}

let keywords = getKeywords();
let keywordElement = createKeywordElement(keywords);

//console.log(keywords);
//console.log(keywordElement);

let productDescription = getProductDescription();
productDescription.childNodes[3].prepend(keywordElement);
