// ==UserScript==
// @name         Denounce ignored content (discovery)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes "You've chosen to ignore content by ..." elements from discovery feeds.
// @author       LittleBitwise
// @match        https://community.secondlife.com/discover/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=secondlife.com
// @grant        none
// ==/UserScript==

'use strict';

function getItems() {
	return document.querySelectorAll(
		'li.ipsStreamItem'
	);
}

getItems().forEach((item) => {
	let node = item.childNodes[1].childNodes[3];
	let isIpsTypeBreak = node.classList.contains('ipsType_break');

	if (!isIpsTypeBreak) {
		return; // Continue to next iteration in forEach, does not break loop!
	}

	let isIgnored = node.childNodes[1].classList.contains('ipsComment_ignored');

	if (isIgnored) {
		item.remove();
	}
})
