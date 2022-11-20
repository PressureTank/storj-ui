// Copyright (C) 2022 Storj Labs, Inc.
// See LICENSE for copying information.

import {expect, test as base } from '@playwright/test';

type BusinessAccount = {
    name: string;
    email: string;
    company: string;
    title: string;
    password: string;
}

export const test = base.extend<{}, { business_account: BusinessAccount } >({
    business_account: [async ({ browser }, use, workerInfo) => {
        const business_worker = workerInfo.workerIndex
        const name = business_worker + 'Business Test';
        const email = 'business' + business_worker + '@mail.io'
        const company = 'storj'
        const title = 'SDET'
        const password = 'Pass123'

        const page = await browser.newPage();
        await page.goto('/signup');
        await page.getByPlaceholder('Enter Full Name').fill(name);
        await page.getByPlaceholder('user@example.com').fill(email);
        await page.getByPlaceholder('Acme Corp.').fill(company);
        await page.getByPlaceholder('Position').fill(title);
        await page.getByPlaceholder('Enter Password').fill(password);
        await page.getByPlaceholder('Retype Password').fill(password);
        await page.locator('span').first().click();
        await page.getByText('Sign Up').click();

        const registerTitle = page.locator('.title');
        await expect(registerTitle).toContainText('RegisterSuccess | Storj')
        await use({email, password})

    }, { scope: 'worker'}],
    page: async ({ page, business_account }, use) => {
        // Sign in with our account.
        const { email, password } = business_account;

        await page.goto('/login');
        await page.getByPlaceholder('user@example.com').fill(email);
        await page.getByPlaceholder('Enter Password').fill(password);
        await page.getByText('Sign In').click();

        const loginTitle = page.locator('.title');
        await expect(loginTitle).toContainText('My First Project')

        // Use signed-in page in the test.
        await use(page);
    },
});

export { expect } from '@playwright/test';
