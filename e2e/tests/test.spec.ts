// Copyright (C) 2022 Storj Labs, Inc.
// See LICENSE for copying information.
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('http://nightly.storj.rodeo:10000/buckets/management');
	await page.getByRole('cell', { name: 'test-bucket' }).locator('div').click();
	await page.getByPlaceholder('Enter a passphrase here').click();
	await page.getByPlaceholder('Enter a passphrase here').fill('password');
	await page.getByText('Continue ->').click();
	await page.getByRole('button', { name: 'Upload' }).click();
	await page.getByText('Upload File').click();
	await page.locator('body').setInputFiles('./assets/small_file.txt');
	await page.locator('.modal__info > div:nth-child(5)').click();
	await page.getByText('Copy Link').click();
	await page.locator('.mask__wrapper__container__close > svg').click();
	await page.getByRole('row').filter({hasText: 'small_file.txt'}).getByRole('button').click();
	const [download] = await Promise.all([
		page.waitForEvent('download'),
		page.getByRole('button', { name: 'Download' }).click()
	]);
	console.log(await download.path());
	await download.saveAs('./assets/downloaded_file.txt');
	await page.getByRole('button', { name: 'Share' }).click();
	await page.locator('span').filter({ hasText: 'Copy' }).click();
	await page.locator('.notification-wrap__buttons-group__close > svg > path').click();
	await page.locator('.mask__wrapper__container__close > svg > path').click();
});
