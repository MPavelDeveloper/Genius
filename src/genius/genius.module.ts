import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './genius-routing.module';
import {GeniusComponent} from './genius.component';
import {PersonComponent} from './person.components/person/person.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PersonFormComponent} from './person.components/person-form/person-form.component';
import {FamilyFormComponent} from './family.components/family-form/family-form.component';
import {FamilyComponent} from './family.components/family/family.component';
import {PersonsPageComponent} from './person.components/persons-page/persons-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DataProvider} from './services/data-provider';
import {LocalStorageDataProvider} from './services/local-storage/local-storage-data-provider.service';
import {LifeEventFormComponent} from './event.components/life-event-form/life-event-form.component';
import {LifeEventComponent} from './event.components/life-event/life-event.component';
import {HttpDataProvider} from './services/http-provider/http-data-provider.service';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {FamiliesPageComponent} from './family.components/families-page/families-page.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {TokenInterceptorService} from './services/interceptor/token-interceptor.service';
import {GeniusGuard} from './genius-guard.service';


const GeniusRoutes: Routes = [
  {path: 'Persons', component: PersonsPageComponent, canActivate: [GeniusGuard]},
  {path: 'Families/:id', component: FamiliesPageComponent, canActivate: [GeniusGuard]},
  {path: 'viewPerson/:id', component: PersonFormComponent,},
  {path: 'createPerson', component: PersonFormComponent,},
  {path: 'selectPerson', component: PersonFormComponent,},
  {path: 'addPersonInNewFamily', component: PersonFormComponent,},
  {path: 'viewFamily/:id', component: FamilyFormComponent,},
  {path: 'createFamily/:id', component: FamilyFormComponent,},
  {path: 'editFamily/:id', component: FamilyFormComponent,},
  {path: 'login', component: UserLoginComponent,},
  {path: '**', redirectTo: 'Persons',},
];

@NgModule({
  declarations: [
    GeniusComponent,
    PersonComponent,
    PersonFormComponent,
    FamilyFormComponent,
    FamilyComponent,
    PersonsPageComponent,
    LifeEventComponent,
    LifeEventFormComponent,
    ConfirmDialogComponent,
    FamiliesPageComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(GeniusRoutes),
    HttpClientModule,

  ],
  providers: [{provide: DataProvider, useValue: new LocalStorageDataProvider()}, GeniusGuard,],
  // providers: [{provide: DataProvider, useClass: HttpDataProvider},
  //   {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
  //   GeniusGuard,
  // ],
  bootstrap: [GeniusComponent]
})
export class GeniusModule {}
