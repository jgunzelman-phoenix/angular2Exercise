import { Component, OnInit,  Output, EventEmitter, SystemJsNgModuleLoader } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Person } from '../../model/Person';
import { PersonService } from '../../service/person.service';
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

  @Output()
  update = new EventEmitter<Person>();

  constructor(public peopleAPI: PersonService) { }
  ngOnInit() {
    this.startAutoRefresh();
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

  /**
   * Removes a person button 
   * @param person 
   */
  public removePerson(person : Person){
    this.peopleAPI.removePerson(person);
  }

  /**
   * Updates a Person this is what is called from the button
   * @param person 
   */
  public updatePerson(person : Person){
    //call back to send it to parent component
    this.update.emit(person);
  }

}
