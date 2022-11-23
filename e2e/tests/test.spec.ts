// Copyright (C) 2022 Storj Labs, Inc.
// See LICENSE for copying information.
import { test, expect } from '../pages/account';

test('check creds', async ({ page }) => {
	await page.goto('/new-project-dashboard');
});
