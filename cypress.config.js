const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'Automation Exercise - Relatório de Testes',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  // Anúncios de terceiros deixam a página lenta e abrem pop-ups (google_vignette) que quebram os testes
  blockHosts: [
    '*googlesyndication.com',
    '*doubleclick.net',
    '*googleadservices.com',
    '*adtrafficquality.google',
    '*fundingchoicesmessages.google.com'
  ],
  e2e: {
    baseUrl: 'https://automationexercise.com',
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on)
    }
  }
})
