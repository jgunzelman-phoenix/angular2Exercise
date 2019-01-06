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
  public columns = ['ssn', 'first_name', 'last_name', 'dob', 'hair_color', 'height', 'edit', 'delete'];

  constructor(public peopleAPI: PersonService) { }
  ngOnInit() {
    this.startAutoRefresh();
  }

  public startAutoRefresh(){
    var autoTimer = timer(60000, 0);
    var sub = autoTimer.subscribe(
      t => {
        this.peopleAPI.getPeople(this.people);
      }
    )
  }

  public removePerson(person : Person){
    this.peopleAPI.removePerson(person);
  }

}
