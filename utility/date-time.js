'use strict';

// This is a library for Tampermonkey scripts
// It must not contain code that executes without being called
// It must not contain a header to avoid confusion with non-library files

// Purpose:
// Functions for creating and manipulating time and date related data.

function getOlderDate(oldest, current) {
	return new Date(current) < new Date(oldest) ? current : oldest;
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
