import {Component, OnInit} from '@angular/core';
import {TokenInterceptorService} from '../services/interceptor/token-interceptor.service';
import { Router} from '@angular/router';
import {DataProvider} from '../services/data-provider';

enum UserFormType {
  LOGIN = 'login',
  REGISTRY = 'registry',
}

export interface UserLoginData {
  username: string;
  password: string;
}

export interface UserRegistryData {
  name: string;
  surName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  public login: string;
  public password: string;
  public nameRegistry: string;
  public surnameRegistry: string;
  public emailRegistry: string;
  public passwordRegistry: string;
  public currentUserFormType: UserFormType;
  public unregistered: boolean;
  public userFormType;

  constructor(private dataProvider: DataProvider, private intreceptor: TokenInterceptorService, private router: Router) {
    this.userFormType = UserFormType;
  }

  ngOnInit() {
    this.currentUserFormType = UserFormType.LOGIN;
    (this.dataProvider.getToken()) ? this.unregistered = false : this.unregistered = true;
  }

  public formToggle(): void {
    if (this.currentUserFormType === UserFormType.LOGIN) {
      this.currentUserFormType = UserFormType.REGISTRY;
    } else if (this.currentUserFormType === UserFormType.REGISTRY) {
      this.currentUserFormType = UserFormType.LOGIN;
    }
  }

  public loginUser(): void {
    this.dataProvider.loginUser(<UserLoginData>{
      username: this.login,
      password: this.password,
    }).subscribe((response) => {
        this.dataProvider.setToken(response.headers.get('Authorization'));
        this.router.navigate(['Persons']);
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public registerUser(): void {
    this.dataProvider.registerUser(<UserRegistryData>{
      name: this.nameRegistry,
      surName: this.surnameRegistry,
      email: this.emailRegistry,
      password: this.passwordRegistry,
    }).subscribe(() => {
        this.formToggle();
        this.login = this.emailRegistry;
        this.password = this.passwordRegistry;
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      })
  }

  public exit(): void {
    this.dataProvider.setToken('');
    this.unregistered = true;
  }
}
