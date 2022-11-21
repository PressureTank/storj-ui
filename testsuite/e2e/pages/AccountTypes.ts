// Copyright (C) 2022 Storj Labs, Inc.
// See LICENSE for copying information.

import { test as base, Page, Browser, Locator } from '@playwright/test';
export { expect } from '@playwright/test';


// Here you can add locators and helper methods specific to the admin page.
class BusinessUser {

	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	static async create(browser: Browser) {
		const context = await browser.newContext({ storageState: 'businessStorageState.json' });
		const page = await context.newPage();
		return new BusinessUser(page);
	}
}

// Page Object Model for the "user" page.
// Here you can add locators and helper methods specific to the user page.
class PersonalUser {
	// Page signed in as "user".
	page: Page;

	// Example locator pointing to "Welcome, User" greeting.
	greeting: Locator;

	constructor(page: Page) {
		this.page = page;
		this.greeting = page.locator('#greeting');
	}

	static async create(browser: Browser) {
		const context = await browser.newContext({ storageState: 'personalStorageState.json' });
		const page = await context.newPage();
		return new PersonalUser(page);
	}
}

// Declare the types of your pages.
type MyFixtures = {
	businessPage: BusinessUser;
	personalPage: PersonalUser;
};

// Extend base test by providing "businessPage" and "userPage".
// This new "test" can be used in multiple test files, and each of them will get the pages.
export const test = base.extend<MyFixtures>({
	businessPage: async ({ browser }, use) => {
		await use(await BusinessUser.create(browser));
	},
	personalPage: async ({ browser }, use) => {
		await use( await PersonalUser.create(browser));
	},
});


// example.spec.ts
// Import test with our new pages.

/* import { test, expect } from './pages';
*
*  // Use businessPage and userPage pages in the test.
* test('admin and user', async ({ businessPage, userPage }) => {
* 	// ... interact with both businessPage and userPage ...
* 	await businessPage.page.screenshot();
* 	await expect(userPage.greeting).toHaveText('Welcome, User');
* });
*/
