// Copyright (C) 2022 Storj Labs, Inc.
// See LICENSE for copying information.
import { test as base, Page, Browser } from '@playwright/test';
export { expect } from '@playwright/test';

//business user
class BusinessUser {
	page: Page;

	constructor(page:Page) {
		this.page = page;
	}

	static async create(browser: Browser) {
		const context = await browser.newContext({ storageState: 'businessStorageState.json' });
		const page = await context.newPage();
		return new BusinessUser(page);
	}

}

class PersonalUser {
	page: Page;

	constructor(page:Page) {
		this.page = page;
	}
	static async create(browser: Browser) {
		const context = await browser.newContext({ storageState: 'personalStorageState.json' });
		const page = await context.newPage();
		return new PersonalUser(page);
	}
}
