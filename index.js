// ==UserScript==
// @name         Refined GitHub Notes
// @license      MIT
// @homepageURL  https://github.com/uncenter/refined-github-notes
// @supportURL   https://github.com/uncenter/refined-github-notes/issues
// @namespace    uncenter/refined-github-notes
// @version      0.1.0
// @description  Write notes for pull requests on GitHub.
// @author       uncenter
// @match        https://github.com/**
// @grant        none
// ==/UserScript==

(function () {
	"use strict";

	setTimeout(() => {
		run();
	}, 1000);
})();

function run() {
	const STORAGE_KEY = "refined-github-notes";
	const ENTRY_ID = new URL(location.href).pathname;
	let notes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

	const notificationsEl = document.querySelector(".thread-subscription-status");
	const notesEl = document.createElement("textarea");
	notesEl.classList.add("FormControl-textarea");
	notesEl.setAttribute("style", "margin-bottom: var(--base-size-8);");
	notificationsEl.append(notesEl);
	notesEl.value = notes[ENTRY_ID] || "";

	notesEl.addEventListener("change", () => {
		notes[ENTRY_ID] = notesEl.value;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
	});
}
