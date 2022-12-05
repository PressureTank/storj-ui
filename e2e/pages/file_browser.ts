// Copyright (C) 2022 Storj Labs, Inc.
// See LICENSE for copying information.
import { test as base, Page, Browser } from '@playwright/test';
export { expect } from '@playwright/test';

class Account {
	page: Page;
	fullName = 'test testerson';
	email = 'tester@test.io';
	password = '123a123';

	constructor(page:Page, fullName:string, email:string, password:string) {
		this.page = page;
		this.fullName = fullName;
		this.email = email;
		this.password = password;
	}

	static async create(browser: Browser) {
		const context = await browser.newContext();
		const page = await context.newPage();
		return new Account(page, 'test testerson', 'testerson@test.io', `123a123`);
	}
}


export const test = base.extend<{}, { account }>({
	account: [async ({ browser }, use, workerInfo) => {
		await Account.create(browser);
		const fullName = 'Test ' + workerInfo.workerIndex + ' Testerson';
		const email = 'tester-' + workerInfo.workerIndex + '@test.this';
		const password = "Test_123";

		await page.goto('/signup');
		await page.getByPlaceholder('Enter Full Name').fill(fullName);
		await page.getByPlaceholder('user@example.com').fill(email);
		await page.getByPlaceholder('Enter Password').fill(password);
		await page.getByPlaceholder('Retype Password').fill(password);
		await page.getByText('Sign Up').click();

		await use({ email, password });
	},{ scope: 'worker' }],

page: async ({ page, account }, use) => {
	await page.goto('/login');
	await page.getByPlaceholder('user@example.com').fill(account.email);
	await page.getByPlaceholder('Password').fill(account.password);
	await page.locator('#app div').filter({hasText: 'Sign In'}).nth(4).click();
	await page.context().storageState({ path: 'storageState.json' });

},
});
