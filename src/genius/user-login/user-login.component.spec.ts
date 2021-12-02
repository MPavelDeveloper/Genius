import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserFormType, UserLoginComponent, UserLoginData, UserRegistryData} from './user-login.component';
import {DataProvider} from '../services/data-provider';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let userLogInData: UserLoginData;
  let userRegistryData: UserRegistryData;
  let dataProviderSpy = jasmine.createSpyObj(['setToken', 'getToken', 'registerUser', 'loginUser']);
  let routerSpy = jasmine.createSpyObj(['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [UserLoginComponent],
      providers: [
        {provide: DataProvider, useValue: dataProviderSpy},
        {provide: Router, useValue: routerSpy},
      ],
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    userLogInData = {
      username: 'johnWick@mail.ru',
      password: '1111',
    }
    userRegistryData = {
      name:'John',
      surName:'Wick',
      email:'johnWick@mail.ru',
      password:'1111',
    }
    component.login = userLogInData.username;
    component.password = userLogInData.password;
    fixture.autoDetectChanges(true);
    dataProviderSpy.setToken.calls.reset();
    dataProviderSpy.getToken.calls.reset();
    dataProviderSpy.registerUser.calls.reset();
    dataProviderSpy.loginUser.calls.reset();
  });

  it('should create user-login component', () => {
    expect(component).toBeTruthy();
  });

  it('should be the same, formToggle()', () => {
    expect(component.currentUserFormType).toBe(UserFormType.LOGIN);
    component.formToggle();
    expect(component.currentUserFormType).toBe(UserFormType.REGISTRY);
    component.formToggle();
    expect(component.currentUserFormType).toBe(UserFormType.LOGIN);
  });

  it('should be called, loginUser()', () => {
    dataProviderSpy.loginUser.and.returnValue(new Observable(subscriber => subscriber.next('Barer test')));
    component.loginUser();
    expect(dataProviderSpy.loginUser).toHaveBeenCalled();
    expect(dataProviderSpy.loginUser).toHaveBeenCalledTimes(1);
    expect(dataProviderSpy.setToken).toHaveBeenCalled();
    expect(dataProviderSpy.setToken).toHaveBeenCalledTimes(1);
  });

  it('should be called, registerUser()', () => {
    dataProviderSpy.registerUser.and.returnValue(new Observable(subscriber => subscriber.next('')));
    component.registerUser();
    expect(dataProviderSpy.registerUser).toHaveBeenCalled();
    expect(dataProviderSpy.registerUser).toHaveBeenCalledTimes(1);
  });

  it('should be called, logoutUser()', () => {
    component.logoutUser();
    expect(component.unregistered).toBeTrue();
    expect(dataProviderSpy.setToken).toHaveBeenCalled();
    expect(dataProviderSpy.setToken).toHaveBeenCalledTimes(1);
  });

  it('Login form, should be the same, html elements', () => {
    component.currentUserFormType = UserFormType.LOGIN;
    fixture.detectChanges()
    let regFormStateLogin = fixture.debugElement.query(By.css('.reg-form'));
    expect(regFormStateLogin).toBeNull();
    component.currentUserFormType = UserFormType.REGISTRY;
    fixture.detectChanges()
    let regFormStateRegistry = fixture.debugElement.query(By.css('.reg-form'));
    expect(regFormStateRegistry).toBeDefined();
  });

});
