import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { PersonService } from 'src/app/service/person.service';
import { Person } from 'src/app/model/Person';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss']
})
export class AddPersonDialogComponent implements OnInit {
  public person: Person = new Person();
  public update: boolean;
  public errorText: String = "";
  public dob: number;
  //Validators
  public ssnController: FormControl = new FormControl("", [Validators.required])
  public fnController: FormControl = new FormControl('', [Validators.required])
  public lnController: FormControl = new FormControl('', [Validators.required])
  public dobController: FormControl = new FormControl(new Date(), [Validators.required])
  public hController: FormControl = new FormControl(0, [Validators.required])
  public hcController: FormControl = new FormControl('', [Validators.required])

  constructor(public dialogRef: MatDialogRef<AddPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person, public personApi: PersonService) {
    //update person or new person?
    if (data == null) {
      this.update = false;
      this.data = new Person();
    } else {
      this.update = true;
    }
  }

  ngOnInit() {
    //Validators
    if (this.update) {
      this.ssnController = new FormControl(this.data.id, [Validators.required])
      this.fnController = new FormControl(this.data.firstName, [Validators.required])
      this.lnController = new FormControl(this.data.lastName, [Validators.required])
      var dob = new Date();
      dob.setUTCMilliseconds(this.data.dob.valueOf());
      this.dobController = new FormControl(dob, [Validators.required])
      this.hController = new FormControl(0, [Validators.required])
      this.hcController = new FormControl('', [Validators.required])
    }
  }

  public setDOB(event: MatDatepickerInputEvent<Date>) {
    this.data.dob = event.value.getUTCMilliseconds();
  }

  /**
   * Function for add person button. checks validators before calling API. 
   */
  public addPerson() {
    //validate input
    if (this.ssnController.valid && this.fnController.valid
      && this.lnController.valid && this.dobController.valid
      && this.hController.valid && this.hcController.valid) {
      //set values
      this.data.id = this.ssnController.value;
      this.data.firstName = this.fnController.value;
      this.data.lastName = this.lnController.value;
      this.data.hairColor = this.hcController.value;
      this.data.heightInInches = this.hController.value;

      var dob: Date = this.dobController.value;
      this.data.dob = dob.getUTCMilliseconds();
      //call api
      this.personApi.addPerson(this.data).subscribe(
        (data) => {
          this.dialogRef.close();
        },
        (error) => {
          this.errorText = error.message;
        }
      );
    }
  }

  /**
   * Function for updating a person button. checks validators before calling API. 
   */
  public updatePerson() {
    //validate
    if (this.ssnController.valid && this.fnController.valid
      && this.lnController.valid && this.dobController.valid
      && this.hController.valid && this.hcController.valid) {
      //set values
      this.data.id = this.ssnController.value;
      this.data.firstName = this.fnController.value;
      this.data.lastName = this.lnController.value;
      this.data.hairColor = this.hcController.value;
      this.data.heightInInches = this.hController.value;
      var dob: Date = this.dobController.value;
      this.data.dob = dob.getUTCMilliseconds();
      this.personApi.updatePerson(this.data).subscribe(
        (data) => {
          this.dialogRef.close();
        },
        (error) => {
          this.errorText = error.message;
        }
      );
    }
  }

}
