import { test } from '@playwright/test';

test('basic user test',
  async ({page}) => {
    await page.goto('/');
    await page.locator('div').filter({hasText: 'Sign In Storj Email Address Password Sign In Forgot your sign in details? Reset '}).nth(1).click();
    await page.getByRole('link', {name: 'Need to create an account?'}).click();
    await page.getByPlaceholder('Enter Full Name').click();
    await page.getByPlaceholder('Enter Full Name').fill('ant man');
    await page.getByPlaceholder('user@example.com').click();
    await page.getByPlaceholder('user@example.com').fill('ant@man.com');
    await page.getByPlaceholder('user@example.com').press('Tab');
    await page.getByPlaceholder('Enter Password').fill('test123@');
    await page.getByPlaceholder('Enter Password').press('Tab');
    await page.getByPlaceholder('Retype Password').fill('test123@');
    await page.locator('span').first().click();
    await page.getByText('Sign Up').click();
    await page.getByRole('link', {name: 'Go to Login page'}).click();

    await page.getByPlaceholder('user@example.com').click();

    await page.getByPlaceholder('user@example.com').fill('ant@man.com');
    await page.getByPlaceholder('user@example.com').press('Tab');
    await page.getByPlaceholder('Password').fill('test123@');
    await page.locator('#app div').filter({hasText: 'Sign In'}).nth(4).click();
    await page.locator('div').nth(2).click();
  });