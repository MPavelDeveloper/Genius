import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {environment} from './environments/environment';


import {json, GENEALOGY_STORAGE_KEY} from './json'

if (localStorage.getItem(GENEALOGY_STORAGE_KEY) === null) {
  localStorage.setItem(GENEALOGY_STORAGE_KEY, json)
}


// import of own modules
import {GeniusModule} from './genius/genius.module';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(GeniusModule)
  .catch(err => console.error(err));


