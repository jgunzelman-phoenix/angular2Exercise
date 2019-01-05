import { TestBed, async, inject } from '@angular/core/testing';
import { Person } from '../model/Person';
import { PersonService } from './person.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PersonService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], //add injected dependecies from angular this injects the testing http client to the person service
    providers: [PersonService] //this is who needs said dependencies
  }));

  it('should be created', () => {
    const service: PersonService = TestBed.get(PersonService);
    expect(service).toBeTruthy();
  });

  it('should sync add missing to list', async(inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const service: PersonService = TestBed.get(PersonService);
    var people1 : Person[] =
    [
      {"id":"111111111","lastName":"Gunzelman","firstName":"Jeffrey","dob":1546362000000,"hairColor":"blue","heightInInches":63}
    ]
    var people2 : Person[] = 
    [
      {"id":"111111111","lastName":"Gunzelman","firstName":"Jeffrey","dob":1546362000000,"hairColor":"blue","heightInInches":63},
      {"id":"222222222","lastName":"Doe","firstName":"John","dob":1546362000000,"hairColor":"green","heightInInches":60}
    ]

    service.syncPeople(people1,people2);
    expect(people1.length).toBe(2);
    expect(people1[1].id).toBe("222222222");
  })));

  it('should sync remove missing from list', async(inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const service: PersonService = TestBed.get(PersonService);
    var people1 : Person[] =
    [
      {"id":"111111111","lastName":"Gunzelman","firstName":"Jeffrey","dob":1546362000000,"hairColor":"blue","heightInInches":63},
      {"id":"222222222","lastName":"Doe","firstName":"John","dob":1546362000000,"hairColor":"green","heightInInches":60}
    ]
    var people2 : Person[] = 
    [
      {"id":"222222222","lastName":"Doe","firstName":"John","dob":1546362000000,"hairColor":"green","heightInInches":60}
    ]

    service.syncPeople(people1,people2);
    expect(people1.length).toBe(1);
    expect(people1[0].id).toBe("222222222");
  })));

  it('should sync update value', async(inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const service: PersonService = TestBed.get(PersonService);
    var people1 : Person[] =
    [
      {"id":"222222222","lastName":"Doe","firstName":"John","dob":1546362000000,"hairColor":"green","heightInInches":60}
    ]
    var people2 : Person[] = 
    [
      {"id":"222222222","lastName":"Doe","firstName":"John","dob":1546362000000,"hairColor":"blue","heightInInches":60}
    ]

    service.syncPeople(people1,people2);
    expect(people1.length).toBe(1);
    expect(people1[0].hairColor).toBe("blue");
  })));

});
