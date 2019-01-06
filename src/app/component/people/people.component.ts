import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddPersonDialogComponent } from "../add-person-dialog/add-person-dialog.component";
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  public view = "table";

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  /**
   * Opens add person dialog
   */
  public addPerson(){
    const dialogRef = this.dialog.open(AddPersonDialogComponent, {
      width: '600px',
      data: null
    });
  }

}
