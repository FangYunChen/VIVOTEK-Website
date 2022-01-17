// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'https://vvtk-test-api.azurewebsites.net',
  frontUrl: 'https://www.vvtk.work',
  appInsightsInstrumentationKey: '5df82fb0-0d51-42fa-9e14-c1eec871ce03', // Azure App Insights 金鑰
  unauthorizedRedirectRoute: '/login',
  forbiddenRedirectRoute: '/forbidden',
  authGuardModuleTypes: ['BackendModule']
};
