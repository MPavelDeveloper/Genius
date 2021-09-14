import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { GeniusComponent } from "./genius.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './genius-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  declarations: [
    GeniusComponent
  ],
  providers: [],
  bootstrap: [GeniusComponent]
})

export class GeniusModule{ }
