import { test } from '@playwright/test';

test('test', async ({ page }) => {
    await page.getByPlaceholder('user@example.com').click();
    await page.getByPlaceholder('user@example.com').fill('ant@man.com');
    await page.getByPlaceholder('user@example.com').press('Tab');
    await page.getByPlaceholder('Password').fill('test123@');
    await page.locator('#app div').filter({ hasText: 'Sign In' }).nth(4).click();
    await page.locator('div').nth(2).click();
});