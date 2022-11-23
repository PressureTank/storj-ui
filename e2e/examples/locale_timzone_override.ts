// noinspection JSUnusedLocalSymbols,ES6UnusedImports
// Copyright (C) 2022 Storj Labs, Inc.
// See LICENSE for copying information.

import { test, expect } from '@playwright/test';

test.use({
	locale: 'de-DE',
	timezoneId: 'Europe/Berlin',
});

test('this tests overrides the locale settings', async ({ page }) => {
	// ...
});
