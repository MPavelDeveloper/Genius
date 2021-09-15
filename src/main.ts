import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';

// import module
import { GeniusModule } from './genius/genius.module';

import { json } from "./data.module";
import {GeniusComponent} from "./genius/genius.component";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(GeniusModule)
  .catch(err => console.error(err));

// GeniusComponent.prototype.innerData(JSON.parse(json))
