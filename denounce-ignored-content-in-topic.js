// ==UserScript==
// @name         Denounce ignored content (thread)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes "You've chosen to ignore content by ..." elements from threads.
// @author       LittleBitwise
// @match        https://community.secondlife.com/forums/topic/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=secondlife.com
// @grant        none
// ==/UserScript==

'use strict';

function getItems() {
	return document.querySelectorAll(
		'.ipsComment_ignored'
	);
}

getItems().forEach((item) => {
	item.remove();
})
