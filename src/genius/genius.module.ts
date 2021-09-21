import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataProvider, LocalStorageDataProvider } from './data-provider.service'
import { AppRoutingModule } from './genius-routing.module';

import { GeniusComponent } from "./genius.component";
import { PersonComponent } from './person/person.component';


@NgModule({
  declarations: [
    GeniusComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [{ provide: DataProvider, useValue: new LocalStorageDataProvider() }],
  bootstrap: [GeniusComponent]
})

export class GeniusModule {
}
