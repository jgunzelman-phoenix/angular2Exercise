import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../service/person.service';
import { Person } from '../../model/Person';
import { timer } from "rxjs";

@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.scss']
})
export class PeopleCardComponent implements OnInit {
  public people : Person[] = new Array<Person>();
 
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
      }
    )
  } 

  public removePerson(person : Person){
    this.peopleAPI.removePerson(person);
  }

}
