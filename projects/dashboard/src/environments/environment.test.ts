export const environment = {
  production: true,
  apiUrl: 'https://vvtk-test-api.azurewebsites.net',
  frontUrl: 'https://www.vvtk.work',
  appInsightsInstrumentationKey: '5df82fb0-0d51-42fa-9e14-c1eec871ce03', // Azure App Insights 金鑰
  unauthorizedRedirectRoute: '/login',
  forbiddenRedirectRoute: '/forbidden',
  authGuardModuleTypes: ['BackendModule']
};
