// ==UserScript==
// @name         SL Marketplace Last Modified
// @namespace    https://github.com/LittleBitwise/
// @version      1.0
// @description  Displays the last modified date of product images.
// @author       LittleBitwise
// @match        https://marketplace.secondlife.com/p/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=secondlife.com
// @grant        GM_xmlhttpRequest
// @connect      slm-assets.secondlife.com
// ==/UserScript==

'use strict';

(() => {
	const url = getMainProductImageUrl();

	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(response) {
			const date = getLastModifiedDateString(response);

			if (!date) return;

			const lastModifiedElement = createLastModifiedElement(date);
			const productDescription = getProductDescription();
			productDescription.prepend(lastModifiedElement);
		}
	});
})();


// Utility functions


function getMainProductImageUrl() {
	const url = document.querySelector('#main-product-image').href ?? '';

	return url;
}

function getLastModifiedDateString(response) {
	const headerPrefix = 'last-modified: ';
	const headers = response.responseHeaders.split('\r\n');
	const lastModified = headers.find(h => h.includes(headerPrefix));

	if (lastModified) {
		const date = lastModified.slice(headerPrefix.length);
		return date;
	}

	return '';
}

function createLastModifiedElement(date) {
	const strong = document.createElement('strong');
	strong.innerHTML = 'Last modified: ' + date;

	const p = document.createElement('p');
	p.appendChild(strong);

	return p;
}

function getProductDescription() {
	const result = document.querySelector('#product-description .tab-content');

	return result;
}
