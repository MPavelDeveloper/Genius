import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {environment} from './environments/environment';


import {json, key} from './json'

if (localStorage.getItem(key) === null) {
  localStorage.setItem(key, json)
}


// import of own modules
import {GeniusModule} from './genius/genius.module';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(GeniusModule)
  .catch(err => console.error(err));


