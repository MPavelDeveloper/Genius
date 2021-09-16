import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './genius-routing.module';

// import component's
import { GeniusComponent } from "./genius.component";


@NgModule({
  declarations: [
    GeniusComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [GeniusComponent]
})

export class GeniusModule{ }
