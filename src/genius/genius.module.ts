import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataProvider, LocalStorageDataProvider } from './services/data-provider.service'
import { AppRoutingModule } from './genius-routing.module';

import { GeniusComponent } from "./genius.component";
import { PersonComponent } from './person/person.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import { PersonFormComponent } from './person-form/person-form.component';
import { TestCompComponent } from './test-comp/test-comp.component';
import { FamilyFormComponent } from './family-form/family-form.component';

const GeniusRoutes: Routes = [
  {path:'addPerson', component: PersonFormComponent, },
  {path:'test', component:GeniusComponent, },
  {path:'**', redirectTo:'/', },
]

@NgModule({
  declarations: [
    GeniusComponent,
    PersonComponent,
    PersonFormComponent,
    TestCompComponent,
    FamilyFormComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(GeniusRoutes),
  ],
  providers: [{ provide: DataProvider, useValue: new LocalStorageDataProvider() }],
  bootstrap: [GeniusComponent]
})

export class GeniusModule {
}
