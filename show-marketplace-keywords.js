// ==UserScript==
// @name         SL Marketplace Keywords
// @namespace    https://github.com/LittleBitwise/
// @version      1.0
// @description  Displays product keywords in product description.
// @author       LittleBitwise
// @match        https://marketplace.secondlife.com/p/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=secondlife.com
// @require      https://raw.githubusercontent.com/LittleBitwise/Userscripts/develop/modularity/utility/element.js
// @require      https://raw.githubusercontent.com/LittleBitwise/Userscripts/develop/modularity/utility/marketplace.js
// @require      https://raw.githubusercontent.com/LittleBitwise/Userscripts/develop/modularity/utility/date-time.js
// @grant        none
// ==/UserScript==

'use strict';

(() => {
	const container = new StrongParagraphElement();

	getProductDescription().prepend(container.getRootElement());

	const keywords = getProductKeywordsList();
	const clean = keywords.filter(n => n).join(', ');

	container.setContent(`Keywords: ${clean}`);
})();
