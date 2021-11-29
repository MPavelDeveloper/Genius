import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserLoginComponent} from './user-login.component';
import {DataProvider} from '../services/data-provider';
import {LocalStorageDataProvider} from '../services/local-storage/local-storage-data-provider.service';
import {GeniusGuard} from '../genius-guard.service';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [UserLoginComponent],
      providers: [{provide: DataProvider, useValue: new LocalStorageDataProvider()},
        GeniusGuard],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeTrue()
  });
});
