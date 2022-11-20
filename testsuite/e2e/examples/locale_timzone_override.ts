import { test, expect } from '@playwright/test';

test.use({
	locale: 'de-DE',
	timezoneId: 'Europe/Berlin',
});

test('this tests overrides the locale settings', async ({ page }) => {
	// ...
});