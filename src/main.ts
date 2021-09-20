import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';


import { json } from './json'
localStorage.setItem('json', json)
// console.log(json)


// import of own modules
import { GeniusModule } from './genius/genius.module';





if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(GeniusModule)
  .catch(err => console.error(err));


