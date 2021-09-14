import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { GeniusModule } from './genius/genius.module';
import { environment } from './environments/environment';

import { json } from "./data.module";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(GeniusModule)
  .catch(err => console.error(err));

console.log(json)
