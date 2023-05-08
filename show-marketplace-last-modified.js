// ==UserScript==
// @name         SL Marketplace Last Modified Date
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

			const fuzzy = getFuzzyDateFormat(date);
			const lastModifiedElement = createLastModifiedElement(fuzzy);
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

function getFuzzyDateFormat(dateString) {
	const MS = 1000;
	const DAY = 86400;
	const WEEK = 604800;
	const MONTH = 2592000;
	const YEAR = 31104000;

	const time = Math.floor((new Date() - new Date(dateString)) / MS)

	// Note: parseFloat() is used convert numbers like "5.0" to "5"

	if (time >= 2 * YEAR) {return `${parseFloat((time/YEAR).toFixed(1))} years ago`;}
	if (time >= 1 * YEAR) {return `a year ago`;}

	if (time >= 2 * MONTH) {return `${parseFloat((time/MONTH).toFixed(1))} months ago`;}
	if (time >= 1 * MONTH) {return `a month ago`;}

	if (time >= 2 * WEEK) {return `${parseFloat((time/WEEK).toFixed(1))} weeks ago`;}
	if (time >= 1 * WEEK) {return `a week ago`;}

	if (time >= 2 * DAY) {return `${parseFloat((time/DAY).toFixed(1))} days ago`;}
	if (time >= 1 * DAY) {return `yesterday`;}

	return `today`;
}

function createLastModifiedElement(date) {
	const strong = document.createElement('strong');
	strong.innerHTML = 'Date: ' + date;

	const p = document.createElement('p');
	p.appendChild(strong);

	return p;
}

function getProductDescription() {
	const result = document.querySelector('#product-description .tab-content');

	return result;
}
