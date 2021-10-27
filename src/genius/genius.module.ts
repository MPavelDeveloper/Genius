import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './genius-routing.module';
import {GeniusComponent} from './genius.component';
import {PersonComponent} from './person/person.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PersonFormComponent} from './person-form/person-form.component';
import {FamilyFormComponent} from './family-form/family-form.component';
import {FamilyComponent} from './family/family.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PersonEditorComponent} from './person-editor/person-editor.component';
import {PersonListComponent} from './person-list/person-list.component';
import {HttpClientModule} from '@angular/common/http';
import {DataProvider} from './services/data-provider';
import {LocalStorageDataProvider} from "./services/local-storage/local-storage-data-provider.service";
import {LifeEventFormComponent} from "./life-event-form/life-event-form.component";
import { LifeEventComponent } from './life-event/life-event.component';
import {PersonEventEditorComponent} from './person-event-editor/person-event-editor.component';
import {HttpDataProvider} from './services/http-provider/http-data-provider.service';



const GeniusRoutes: Routes = [
  {path: 'Home', component: HomePageComponent,},
  {path: 'createPerson', component: PersonEditorComponent,},
  {path: 'createPersonEvent', component: PersonEventEditorComponent,},
  {path: 'createFamily', component: FamilyFormComponent,},
  {path: '**', redirectTo: 'Home',},
]

@NgModule({
  declarations: [
    GeniusComponent,
    PersonComponent,
    PersonFormComponent,
    FamilyFormComponent,
    FamilyComponent,
    HomePageComponent,
    PersonEditorComponent,
    PersonListComponent,
    LifeEventComponent,
    LifeEventFormComponent,
    PersonEventEditorComponent,
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
  // providers: [{provide: DataProvider, useValue: new LocalStorageDataProvider()}],
  providers: [{provide: DataProvider, useClass: HttpDataProvider}],
  bootstrap: [GeniusComponent]
})
export class GeniusModule {
}
