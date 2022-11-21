// @ts-ignore
import os from 'node:os';
import { PlaywrightTestConfig, devices, ReporterDescription} from '@playwright/test';

// require('dotenv').config();

// Potentially interesting metadata to append into the test report – might help with debugging
const metadata: Record<string, string> = {
  cpu: os.arch(),
  memory: `${os.totalmem() / (1024 ** 2)} MB`,
  hostname: os.hostname(),
  system: os.type(),
  kernel: os.version(),
};

enum Reporter {
  HTML = 'html',
  List = 'list',
  CI = 'github'
}

/**
 * Customize reporters.
 * By default, we want to have a standard list reporting and a pretty HTML output.
 * In CI pipelines, we want to have an annotated report visible on the GitHub Actions page.
 */
const addReporter = (): ReporterDescription[] => {
  const defaultReporter: ReporterDescription[] = [
    [Reporter.List],
    [Reporter.HTML],
  ];

  if (isPipeline) {
    return defaultReporter.concat([[Reporter.CI]]);
  }

  return defaultReporter;
}

// Check whether tests are running as part of a CI/CD pipeline
const isPipeline = !!process.env.CI;

// Match pixel comparison at least 95 % to avoid flaky tests but ensure enough confidence
const threshold = 0.95;

const config: PlaywrightTestConfig = {
  testDir: './e2e',                                   /* directory where tests are located.  */
  timeout: 30 * 1000,                                 /* Maximum time one test can run for.  */
  expect: {
    timeout: 4000,                                    /* Maximum time expect() should wait for the condition to be met. */
    toMatchSnapshot: { threshold },                   /* only require the screenshots to be the same within a certain threshold */
  },
  fullyParallel: false,                                /* Run tests in files in parallel */
  retries: process.env.CI ? 2 : 0,                    /* Retry on CI only */
  workers: process.env.CI ? 1 : undefined,            /* Opt out of parallel tests on CI. */

  reporter: addReporter(),

  use: {                                              /* Shared settings for all the projects below. */
    actionTimeout: 0,                                 /* Maximum time each action can take. */
    baseURL: 'http://nightly.storj.rodeo:10000/',     /* Base URL to use in actions like `await page.goto('/')`. */
    headless: true,                                   /* Starts the UI tests in headed mode, so we can watch execution in development */
    ignoreHTTPSErrors: true,                          /* suppress the errors relative to serving web data   */
    trace: 'retain-on-failure',                          /* Collect trace when retrying the failed test. */
    launchOptions: {
      slowMo: 5,
    },
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
      name: 'safari',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'Edge',
      ...devices[ 'Desktop Edge' ],
    },
    /* Test against mobile viewports. */
     {
       name: 'Android',
       use: {
         ...devices['Pixel 5'],
       },
     },
     {
       name: 'iPhone(13)',
       use: {
         ...devices['iPhone 13'],
       },
     },
  ],
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',
};

export default config;
