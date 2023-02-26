module.exports = {

    preset: "jest-playwright-preset",
    testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)", "(/abc/.*|(\\.|/)(defg|spec))\\.jsx?$", ".*\\.it\\.test.ts$"],
    transform: {"^.+\\.ts$": "ts-jest", },
    testTimeout: 15000,
    testEnvironmentOptions: {
        "jest-playwright": {
          browsers: ["chromium", "firefox", "webkit"],
          exitOnPageError: true,
          launchOptions: {
            headless: false,
            slowMo: 600
          }
        },
    },
};
