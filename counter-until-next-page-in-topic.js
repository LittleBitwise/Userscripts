// ==UserScript==
// @name         Counter until next page (topic)
// @namespace    https://github.com/LittleBitwise/
// @version      1.0
// @description  Adds a counter when thread is approaching the next page.
// @author       LittleBitwise
// @match        https://community.secondlife.com/forums/topic/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=secondlife.com
// @grant        none
// ==/UserScript==

'use strict';

(() => {
	const form = getPostFeed();
	const posts = getPosts();

	let postCount = posts.length;

	if (postCount >= 20) {
		const remaining = 25 - postCount;
		const notice = createNoticeElement(remaining);
		form.append(notice);
	}
})();

// Thread posts container
function getPostFeed() {
	let result = document.querySelector(
		'#elPostFeed > form'
	);

	return result;
}

// Individual posts
function getPosts() {
	let result = getPostFeed().querySelectorAll(
		'article'
	);

	return result;
}

function createNoticeElement(number) {
	let div = document.createElement('div');
	div.classList.add("ipsMessage", "ipsMessage_info");

	if (number == 0) {
		div.innerHTML = `Next post begins a new page!`;
	} else if (number == 1) {
		div.innerHTML = `Next post will be the last on this page!`;
	} else {
		div.innerHTML = `Next page in ${number} posts.`;
	}

	return div;
}
