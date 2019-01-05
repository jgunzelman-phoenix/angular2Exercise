import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Person } from '../model/Person';
import { ApiError } from '../model/ApiError';
import { PeopleComponent } from '../component/people/people.component';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  public rootUrl : String = "http:/localhost:8080/";

  private httpOptions = {
    headers : new HttpHeaders({
      'ContentType': 'application/json'
    })
  }

  constructor(public http : HttpClient) { }

  /**
   * Synchronizes the provided list of people with what is on the server
   * calls http://localhost/person
   * @param people 
   */
  public getPeople(people : Array<Person>){
    this.http.get(this.rootUrl+"person").subscribe( //this is a async call and the following is a call back method
      (data: Array<Person>) => {
        this.syncPeople(people, data);
      }
    )
  }

  public addPerson(person : Person){
    this.http.post(this.rootUrl+"person", person, this.httpOptions).subscribe();
  }

  public removePerson(person : Person){
    this.http.delete(this.rootUrl+"person/"+person.id).subscribe();
  }

  public updatePerson(person : Person){
    this.http.put(this.rootUrl+"person", person).subscribe();
  }

  public deleteAllPeople(){
    this.http.delete(this.rootUrl+"person").subscribe();
  }

  /**
   * Syncronizes the localList to the remote list. final list is the localList 
   * Why? so that the UI doesnt shutter on update
   * Why a sperate function? easier to unit test 
   * @param localList 
   * @param remoteList 
   */
  public syncPeople(localList : Array<Person>, remoteList : Array<Person>){
    //first sweep to add and update from remotelist
    remoteList.forEach(
      (apiPerson : Person) => {
        var found = false;
        localList.forEach(
          (localPerson : Person) => {
            if(apiPerson.id == localPerson.id && found == false){
              Person.update(localPerson, apiPerson);
              found = true;
            }
          }
        )
        if(found == false){
          localList.push(apiPerson);
        }
      }
    );
    //second sweep to remove people from locallist not in remote list
    localList.forEach(
      (localPerson : Person) => {
        var found = false;
        remoteList.forEach(
          (apiPerson : Person) => {
            if(apiPerson.id == localPerson.id){
              found = true;
            }
          }
        )
        if(found == false){
          localList.splice(localList.indexOf(localPerson,0),1)
        }
      }
    )
  }
}
