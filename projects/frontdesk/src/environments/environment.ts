// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  appKey: 'XNfIArbcR0UCISs_5UAlxIfkJsPrP0hL',
  apiUrl: 'https://vvtk-test-api.azurewebsites.net',
  appInsightsInstrumentationKey: 'd3e13e51-129c-4568-8592-6c7df6938a95', // Azure App Insights 金鑰
  unauthorizedRedirectRoute: '',
  forbiddenRedirectRoute: '',
  authGuardModuleTypes: ['FrontendModule'],
  adminPanelModuleId: 30000, // 在後台 admin/maintain-modules 維護 modules
  adminPanelURL: 'http://admin.vvtk.work',
  googletagmanagerId: 'UA-1877002-1',
  googleCustomSearchElementKey: '011881657632679475768:plmpm32ircs'
};
