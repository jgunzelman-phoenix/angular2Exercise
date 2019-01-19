import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonService } from '../../service/person.service';
import { Person } from '../../model/Person';
import { AddPersonDialogComponent } from '../../component/add-person-dialog/add-person-dialog.component';
import { MatDialog } from '@angular/material';
import { timer } from "rxjs";

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.scss']
})
export class PeopleCardComponent implements OnInit {
  public people : Person[] = new Array<Person>();

  @Input("addPerson")
  addPerson$ : EventEmitter<Person>;

  @Output()
  update = new EventEmitter<Person>();

  constructor(public peopleAPI: PersonService, public dialog: MatDialog) { }
  ngOnInit() {
    this.startAutoRefresh();
    this.addPerson$.subscribe(
      (data : Person) => {
        this.pullData();
      }
    )
  }

  public startAutoRefresh(){
    var autoTimer = timer(0, 60000);
    var sub = autoTimer.subscribe(
      t => {
        this.pullData();
      }
    )
  }

  public pullData(){
    this.peopleAPI.getPeople().subscribe(
      (data: Person[]) => 
      {
        this.people = data;
      }
    )
  }

  public formatDate(milli : Number) : String{
    var date : Date = new Date(milli.valueOf());  
    return date.toDateString();
  }

  /**
   * Removes a person button 
   * @param person 
   */
  public removePerson(person : Person){
    this.peopleAPI.removePerson(person).subscribe(
      (data) => this.pullData()
    );
  }

  /**
   * Updates a Person this is what is called from the button
   * @param person 
   */
  public updatePerson(person : Person){
    const dialogRef = this.dialog.open(AddPersonDialogComponent, {
      width: '1000px',
      data: person
    });

    dialogRef.afterClosed().subscribe(
      result => {
          this.addPerson$.emit(result);
      }
    )
    this.peopleAPI.updatePerson(person).subscribe(
      (data) => this.pullData()
    );
  }

}
