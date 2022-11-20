import { test, expect } from '@playwright/test';

test.use({
	colorScheme: 'dark' // or 'light'
});

test('my test with dark mode', async ({ page }) => {
	// ...
});