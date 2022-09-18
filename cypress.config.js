const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'jzn1w5',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://join.reckon.com/'
  }
});
