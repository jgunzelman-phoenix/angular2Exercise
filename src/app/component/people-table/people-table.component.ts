import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../model/Person';
import { PersonService } from '../../service/person.service';

@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})
export class PeopleTableComponent implements OnInit {

  @Input("people")
  public people : Person[];

  constructor(personApi : PersonService) { }

  ngOnInit() {

  }

}
