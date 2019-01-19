import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PeopleComponent } from './component/people/people.component';
import { PeopleTableComponent } from './component/people-table/people-table.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule
} from '@angular/material';
import { PeopleCardComponent } from './component/people-card/people-card.component';
import { AddPersonDialogComponent } from './component/add-person-dialog/add-person-dialog.component'
import { PersonService } from './service/person.service';
import { ConfirmationDialogComponent } from './component/confirmation-dialog/confirmation-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [  //components you create go here
    AppComponent,
    PeopleComponent,
    PeopleTableComponent,
    PeopleCardComponent,
    AddPersonDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [ // 3rd party or library components go here
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  entryComponents: [AddPersonDialogComponent], // dialogs need to be defined are entry components since they are dynamically generated
  providers: [PersonService], //Services you wish to use go here.  Creates a single instance to be shared. Can be refrenced from a contructor of any angular component or service
  bootstrap: [AppComponent] //root component goes here
})
export class AppModule { }
