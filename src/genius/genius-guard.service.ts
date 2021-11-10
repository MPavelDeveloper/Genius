import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {DataProvider} from './services/data-provider';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  constructor(private dataProvider: DataProvider, private router: Router) {
  }

  canActivate(): boolean  {
    if (this.dataProvider.getToken()) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }

}
