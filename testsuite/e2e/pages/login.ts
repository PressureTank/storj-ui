import { test as base, Page, Browser } from '@playwright/test';
export { expect } from '@playwright/test';

class LoginPage {
	constructor(page: Page) {
		this.page = page;
	}

	async fillCredentials(user: User) {
		await this.page.fill('data-test-id=username', user.name);
		await this.page.fill('data-test-id=password', user.password);
	}

	async login() {
		await this.page.click('data-test-id=login');
	}


}
