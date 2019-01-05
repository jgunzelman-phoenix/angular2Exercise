import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../service/person.service';
import { Person } from '../../model/Person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  private people : Person[] = new Array<Person>();

  public table: boolean = true;

  constructor(public peopleAPI: PersonService) { }

  ngOnInit() {
    this.peopleAPI.getPeople(this.people); 
  }



}
