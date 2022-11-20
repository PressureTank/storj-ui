// Copyright (C) 2022 Storj Labs, Inc.
// See LICENSE for copying information.

import {expect, test as base } from '@playwright/test';

type PersonalAccount = {
    name: string;
    email: string;
    password: string;
}

export const test = base.extend<{}, { personal_account: PersonalAccount } >({
    personal_account: [async ({ browser }, use, workerInfo) => {
        const personal_worker = workerInfo.workerIndex
        const name = personal_worker + 'Test Guy';
        const email = 'personal' + personal_worker + '@mail.io'
        const password = 'Pass123'

        const page = await browser.newPage();
        await page.goto('/signup');
        await page.getByPlaceholder('Enter Full Name').fill(name);
        await page.getByPlaceholder('user@example.com').fill(email);
        await page.getByPlaceholder('Enter Password').fill(password);
        await page.getByPlaceholder('Retype Password').fill(password);
        await page.getByText(/^Please have the/i).click();
        await page.getByText(/^I agree to the/i ).click();

        await page.getByText('Sign Up').click();

        const registerTitle = page.locator('.title');
        await expect(registerTitle).toContainText('RegisterSuccess | Storj')
        await use({name, email, password})

    }, { scope: 'worker'}],
    page: async ({ page, personal_account}, use) => {
        // Sign in with our account.
        const {email, password } = personal_account;

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
