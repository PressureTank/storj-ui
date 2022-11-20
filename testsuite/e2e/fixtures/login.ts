import { test } from '@playwright/test';

test('test', async ({ page }) => {
    await page.getByPlaceholder('user@example.com').fill('test@storj.io');
    await page.getByPlaceholder('Password').fill('123a123');
    await page.locator('#app div').filter({ hasText: 'Sign In' }).nth(4).click();
    await page.locator('div').nth(2).click();
});