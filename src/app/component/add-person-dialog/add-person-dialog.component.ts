import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PersonService } from 'src/app/service/person.service';
import { Person } from 'src/app/model/Person';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss']
})
export class AddPersonDialogComponent implements OnInit {
  public person : Person = new Person();
  public update : boolean;

  constructor(public dialogRef: MatDialogRef<AddPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person, personApi: PersonService) {
      //update person or new person?
      if(data == null){
        this.update = false;
      }else{
        this.update = true;
      }
     }

  ngOnInit() {

  }

  public addPerson(){

  }

  public updatePerson(){

  }

}
