import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

// require('dotenv').config();

const config: PlaywrightTestConfig = {
	testDir: './e2e',                                   /* directory where tests are located.  */
	timeout: 30 * 1000,                                 /* Maximum time one test can run for.  */
	expect: {
		timeout: 4000                                     /* Maximum time expect() should wait for the condition to be met. */
	},
	fullyParallel: false,                               /* Run tests in files in parallel */
	retries: process.env.CI ? 2 : 0,                    /* Retry on CI only */
	workers: process.env.CI ? 1 : undefined,            /* Opt out of parallel tests on CI. */

	reporter: [                                         /* Reporter to use. */
		['list'],
		['json', {  outputFile: 'results.json' }]
	],

	use: {                                              /* Shared settings for all the projects below. */
		actionTimeout: 0,                                 /* Maximum time each action can take. */
		baseURL: 'http://nightly.storj.rodeo:10000/',     /* Base URL to use in actions like `await page.goto('/')`. */
		headless: true,                                   /* Starts the UI tests in headed mode so we can watch execution in development */
		ignoreHTTPSErrors: true,                          /* suppress the errors relative to serving web data   */
		trace: 'on-first-retry',                          /* Collect trace when retrying the failed test. */
	},

	/* Configure projects for browsers */
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
			},
		},

		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
			},
		},

		{
			name: 'webkit',
			use: {
				...devices['Desktop Safari'],
			},
		},

		/* Test against mobile viewports. */
		{
			name: 'Mobile Chrome',
			use: {
				...devices['Pixel 5'],
			},
		},
		{
			name: 'Mobile Safari',
			use: {
				...devices['iPhone 12'],
			},
		},
	],
	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	outputDir: 'test-results/',
};

export default config;