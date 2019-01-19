import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Person } from '../../model/Person';
import { PersonService } from "../../service/person.service";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person, private personApi : PersonService) 
    { }

  ngOnInit() { }

  public deletePerson(){
    this.personApi.removePerson(this.data);
    this.dialogRef.close(this.data)
  }

}
