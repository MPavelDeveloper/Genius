import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './genius-routing.module';

// import service's
import { DataServiceProvider } from './data-service-provider.service'

// import component's
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
  providers: [DataServiceProvider],
  bootstrap: [GeniusComponent]
})

export class GeniusModule{ }
