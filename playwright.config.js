// playwright.config.js
// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    expect: {
      timeout: 10000,
      toMatchSnapshot: {
        maxDiffPixels: 10,
      },
    },
  };
  
  module.exports = config;