// ==UserScript==
// @name         Denounce ignored content (topic)
// @namespace    https://github.com/LittleBitwise/
// @version      1.0
// @description  Removes "You've chosen to ignore content by ..." elements from topics.
// @author       LittleBitwise
// @match        https://community.secondlife.com/forums/topic/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=secondlife.com
// @grant        none
// ==/UserScript==

'use strict';

// Main element selector
function selectedElements() {
	let result = document.querySelectorAll(
		'.ipsComment_ignored'
	);

	return result;
}

// Process each main element
selectedElements().forEach((element) => {
	element.remove();
})
