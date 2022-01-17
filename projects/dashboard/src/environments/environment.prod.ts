export const environment = {
  production: true,
  apiUrl: 'https://webapi.vivotek.com', // 原始URL'https://vvtk-web-api-1.azurewebsites.net',
  frontUrl: 'https://www.vivotek.com',
  appInsightsInstrumentationKey: '5df82fb0-0d51-42fa-9e14-c1eec871ce03', // Azure App Insights 金鑰
  unauthorizedRedirectRoute: '/login',
  forbiddenRedirectRoute: '/forbidden',
  authGuardModuleTypes: ['BackendModule']
};
