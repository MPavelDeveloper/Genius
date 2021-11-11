import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from './environments/environment';
import {
  JSON_DEFAULT_GENEALOGY_STORAGE,
  GENEALOGY_STORAGE_KEY,
  GENEALOGY_USER_REGISTRY_KEY,
  JSON_USER_REGISTRY_DEFAULT
} from './json'

if (localStorage.getItem(GENEALOGY_STORAGE_KEY) === null) {
  localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON_DEFAULT_GENEALOGY_STORAGE);
}

if (localStorage.getItem(GENEALOGY_USER_REGISTRY_KEY) === null) {
  localStorage.setItem(GENEALOGY_USER_REGISTRY_KEY, JSON_USER_REGISTRY_DEFAULT);
}

// import of own modules
import {GeniusModule} from './genius/genius.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(GeniusModule)
  .catch(err => console.error(err));


