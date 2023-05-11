'use strict';

// This is a library for Tampermonkey scripts
// It must not contain code that executes without being called
// It must not contain a header to avoid confusion with non-library files

// Purpose:
// Functions for creating general styles of elements and modifying them.

class StrongParagraphElement
{
	constructor(innerHTML) {
		this.strong = document.createElement('strong');
		this.strong.innerHTML = innerHTML;

		this.p = document.createElement('p');
		this.p.appendChild(this.strong);
	}

	getRootElement() {
		return this.p;
	}

	getContent() {
		return this.strong.innerHTML;
	}

	setContent(innerHTML) {
		this.strong.innerHTML = innerHTML;
	}
}
