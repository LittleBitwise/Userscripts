// ==UserScript==
// @name         Denounce ignored content (discover)
// @namespace    https://github.com/LittleBitwise/
// @version      1.0
// @description  Removes "You've chosen to ignore content by ..." elements from discovery feeds.
// @author       LittleBitwise
// @match        https://community.secondlife.com/discover/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=secondlife.com
// @grant        none
// ==/UserScript==

'use strict';

// Main element selector
function selectedElements() {
	let result = document.querySelectorAll(
		'li.ipsStreamItem'
	);

	return result;
}

// Process each main element
selectedElements().forEach((element) => {
	let node = element.querySelector('.ipsComment_ignored');

	let isIgnored = Boolean(node);

	if (isIgnored) {
		element.remove();
	}
})
