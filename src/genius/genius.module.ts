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
import {HomePageComponent} from './home-page/home-page.component';
import {PersonEditorComponent} from './person.components/person-editor/person-editor.component';
import {PersonListComponent} from './person.components/person-list/person-list.component';
import {HttpClientModule} from '@angular/common/http';
import {DataProvider} from './services/data-provider';
import {LocalStorageDataProvider} from "./services/local-storage/local-storage-data-provider.service";
import {LifeEventFormComponent} from "./life-event-form/life-event-form.component";
import { LifeEventComponent } from './life-event/life-event.component';
import {PersonEventEditorComponent} from './person.components/person-event-editor/person-event-editor.component';
import {HttpDataProvider} from './services/http-provider/http-data-provider.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



const GeniusRoutes: Routes = [
  {path: 'Home', component: HomePageComponent,},
  {path: 'createPerson', component: PersonFormComponent,},
  {path: 'createPersonEvent', component: PersonEventEditorComponent,},
  {path: 'createFamily', component: FamilyFormComponent,},
  {path: 'editPerson/:id', component: PersonFormComponent,},
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
    ConfirmDialogComponent,
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
