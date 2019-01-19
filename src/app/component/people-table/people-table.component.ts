import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Person } from '../../model/Person';
import { PersonService } from '../../service/person.service';
import { AddPersonDialogComponent } from '../../component/add-person-dialog/add-person-dialog.component';
import { timer } from "rxjs";

@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})
export class PeopleTableComponent implements OnInit {
  //Table Data
  public columns = ['id', 'firstName', 'lastName', 'dob', 'hairColor', 'heightInInches', 'edit', 'delete'];
  public tableData : MatTableDataSource<Person> = new MatTableDataSource<Person>();

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
        this.tableData = new MatTableDataSource<Person>(this.people);
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
      (data)=>this.pullData()
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
