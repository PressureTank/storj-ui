# Storj-UI Tests via Playwright

### Prerequisites
- _GOLang 1.19_
- _Node v19.2.0_
- _npm v9.1.3_
### Playwright Install
```
npm install
npx playwright install --with-deps
npm install playwright-slack-report -D
configure the env file
```
*****
### Codegen
npx playwright codegen **_url_**
*****
### View Traces
#### View Locally - npx playwright show-trace *__path/to/trace.zip__*
#### View Online - https://trace.playwright.dev/
*****
### Playwright Resources
- Playground - https://try.playwright.tech/
- Github - https://github.com/microsoft/playwright
- Documentation - 
  - https://playwright.dev/docs/intro
  - https://playwright.dev/docs/api/class-playwright
  - https://playwright.dev/docs/api/class-playwright
  - https://playwright.dev/community/welcome
  - https://github.com/microsoft/playwright
- Included examples
- /e2e/examples
    - Clipboard
    - Color Scheme
    - Geolocation
    - Javascript Disabled
    - Locale/Timezone Override
    - User Agent
*****
## Custom Slack reporter
```
npm install playwright-slack-report -D
```
##### playwright.config.ts mods
```typescript
  reporter: [
    [
      "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
      {
        channels: ["#team-integrations-console-alerts", "team-qa-github"], // provide one or more Slack channels
        sendResults: "always", // "always" , "on-failure", "off"
      },
    ],
    ["dot"], // other reporters
  ],
```
environmental variable
```shell
SLACK_BOT_USER_OAUTH_TOKEN
```