import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { IConfig, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    authInterceptorProviders,
    provideEnvironmentNgxMask(maskConfig),
  ],
};
