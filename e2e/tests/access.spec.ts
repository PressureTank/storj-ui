import { test, expect } from '@playwright/test';

test('basic access test', async ({ page }, testInfo) => {
	await page.goto('http://nightly.storj.rodeo:10000/');
	await page.goto('http://nightly.storj.rodeo:10000/new-project-dashboard');
	await page.goto('http://nightly.storj.rodeo:10000/login');
	await page.getByPlaceholder('user@example.com').click();
	await page.getByPlaceholder('user@example.com').fill('integrations@storj.io');
	await page.getByPlaceholder('Password').click();
	await page.getByPlaceholder('Password').fill('testpass');
	await page.locator('#app div').filter({ hasText: 'Sign In' }).nth(4).click();

	let randomNum = getRandomInt(1000);
	let testAccess1 = "test-" + randomNum + "-1"
	//let testAccess1 = "test-" + testInfo.workerIndex + "-1"
	// let testAccess2 = "test-" + randomNum + "-2"
	// let testAccess3 = "test-" + randomNum + "-3"

	if (testInfo.project.name == "Android" || testInfo.project.name == "iPhone(13)") {
		await page.getByRole('banner').locator('svg').nth(1).click();
	}
	await page.getByRole('link', { name: 'Access' }).click();
	await page.getByText('Create Access Grant').click();
	await page.getByPlaceholder('Input Access Name').click();
	await page.getByPlaceholder('Input Access Name').fill(testAccess1);
	await page.locator('.create-access__fragment__wrap__permission > .checkmark-container > .checkmark').click();
	await page.locator('.permissions-chevron-up').click();
	await page.getByText('Encrypt My Access ⟶').click();
	await page.getByPlaceholder('Input Your Passphrase').click();
	await page.getByPlaceholder('Input Your Passphrase').fill('test');
	await page.getByText('Copy to clipboard').click();
	await page.getByRole('checkbox').check();
	await page.locator('div:nth-child(3) > .encrypt__footer-container__buttons__download-button').click();
	await page.locator('.mask__wrapper__container__close > svg').click();


	if (testInfo.project.name == "Android" || testInfo.project.name == "iPhone(13)") {
		await page.getByRole('row', { name: testAccess1 }).getByRole('cell').nth(1).click();
	} else {
		await page.getByRole('row', { name: testAccess1 }).getByRole('cell').nth(2).click();
	}

	await page.getByText('Delete Access').click();

	await page.locator('.input-container').click();
	await page.getByPlaceholder('Type the name of the access').fill(testAccess1);
	await page.locator('.confirm-delete__container__buttons-area > div:nth-child(2)').click();
	await page.getByText('Access Grant deleted successfully');

});

function getRandomInt(max: number): number {
	return Math.floor(Math.random() * max);
}
