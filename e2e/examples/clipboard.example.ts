// noinspection JSUnusedLocalSymbols,ES6UnusedImports
// Copyright (C) 2022 Storj Labs, Inc.
// See LICENSE for copying information.

import { test, expect } from '@playwright/test';

test('template', async ({ page }) => {

	// only use the clipboard in not android and not iPhone
	if (testInfo.project.name != "Android" && testInfo.project.name != "iPhone(13)") {
		const modifier = isMac ? 'Meta' : 'Control';
		await page.setContent(`<div contenteditable>123</div>`);
		await page.focus('div');
		await page.keyboard.press(`${modifier}+KeyA`);
		await page.keyboard.press(`${modifier}+KeyC`);
		await page.keyboard.press(`${modifier}+KeyV`);
		await page.keyboard.press(`${modifier}+KeyV`);
		expect(await page.evaluate(() => document.querySelector('div').textContent)).toBe('123123');
	}

});
