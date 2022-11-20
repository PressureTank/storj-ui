// Copyright (C) 2022 Storj Labs, Inc.
// See LICENSE for copying information.
// noinspection JSUnusedLocalSymbols,ES6UnusedImports

import { test, expect } from '@playwright/test';

test.use({
	colorScheme: 'dark' // or 'light'
});

test('my test with dark mode', async ({ page }) => {
	// ...
});
