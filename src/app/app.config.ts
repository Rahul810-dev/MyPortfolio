import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top', // Scrolls to top on every navigation
  anchorScrolling: 'enabled', // Scrolls to anchors within the page
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling(scrollConfig)),
    provideHttpClient()
  ]
};
