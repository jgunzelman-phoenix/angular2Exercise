import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonCardComponent } from './component/person-card/person-card.component';
import { PeopleComponent } from './component/people/people.component';
import { PeopleTableComponent } from './component/people-table/people-table.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
} from '@angular/material'

@NgModule({
  declarations: [
    AppComponent,
    PersonCardComponent,
    PeopleComponent,
    PeopleTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
