'use strict';

// This is a library for Tampermonkey scripts
// It must not contain code that executes without being called
// It must not contain a header to avoid confusion with non-library files

// Purpose:
// Functions for finding specific elements of pages on the SL Marketplace.



function getProductDescriptionElement() {
	const result = document.querySelector('#product-description .tab-content');

	return result;
}

function getProductKeywordsList() {
	const result = document.head.querySelector('meta[name=keywords]');
	const keywords = result?.content ?? '';

	return keywords.split(/, */);
}

function getMainProductImageUrl() {
	const url = document.querySelector('#main-product-image');

	return url
		? url.href
		: null;
}

function getOtherProductImageUrls() {
	const elements = document.querySelectorAll('#thumbnails a');
	const urls = Array.from(elements).map(a => a.href);

	return urls;
}
