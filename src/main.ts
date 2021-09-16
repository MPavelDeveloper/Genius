import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';

// import of own modules
import { GeniusModule } from './genius/genius.module';


// import json
import { json } from './json'
localStorage.setItem('json', json)




if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(GeniusModule)
  .catch(err => console.error(err));


