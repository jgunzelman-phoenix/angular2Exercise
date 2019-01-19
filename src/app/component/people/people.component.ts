import { Component, OnInit, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Person } from '../../model/Person';
import { AddPersonDialogComponent } from "../add-person-dialog/add-person-dialog.component";
import { Observable } from 'rxjs';
import { PersonService } from 'src/app/service/person.service';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  public view = "table";
  public addPerson$ : EventEmitter<Person> = new EventEmitter<Person>();

  constructor(public dialog: MatDialog, public personApi: PersonService) { }

  ngOnInit() { }

  /**
   * Opens add person dialog
   */
  public addPerson(){
    const dialogRef = this.dialog.open(AddPersonDialogComponent, {
      width: '1000px',
      data: null
    });

    dialogRef.afterClosed().subscribe(
      result => {
          this.addPerson$.emit(result);
        
      }
    )
  }

  public deleteAll(){
    this.personApi.deleteAllPeople().subscribe(
      (data) => this.addPerson$.emit()
    )
  }

}
