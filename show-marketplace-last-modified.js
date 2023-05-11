// ==UserScript==
// @name         SL Marketplace Last Modified Date
// @namespace    https://github.com/LittleBitwise/
// @version      1.0
// @description  Displays the last modified date of product images.
// @author       LittleBitwise
// @match        https://marketplace.secondlife.com/p/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=secondlife.com
// @require      https://raw.githubusercontent.com/LittleBitwise/Userscripts/develop/modularity/utility/element.js
// @require      https://raw.githubusercontent.com/LittleBitwise/Userscripts/develop/modularity/utility/marketplace.js
// @require      https://raw.githubusercontent.com/LittleBitwise/Userscripts/develop/modularity/utility/date-time.js
// @grant        GM_xmlhttpRequest
// @connect      slm-assets.secondlife.com
// ==/UserScript==


'use strict';


(() => {
	const container = new StrongParagraphElement();

	getProductDescriptionElement().prepend(container.getRootElement());

	const url_main = getMainProductImageUrl();
	const url_thumbs = getOtherProductImageUrls();

	promiseOldestUrlDate([url_main, ...url_thumbs]).then(date => {
		const fuzzy = getFuzzyDateFormat(date);
		container.setContent(`Date: ${fuzzy}`);
	});
})();


// Utility functions


function promiseOldestUrlDate(urls) {
	return new Promise(resolve => {
		const dates = urls.map(url => promiseUrlDate(url));
		Promise.all(dates).then(dateStrings => {
			const oldest = dateStrings.reduce(getOlderDate);

			resolve(oldest);
		});
	});
}

function promiseUrlDate(url) {
	return new Promise(resolve => {
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function (response) {
				const date = getLastModifiedDateString(response);

				resolve(date);
			}
		});
	})
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
