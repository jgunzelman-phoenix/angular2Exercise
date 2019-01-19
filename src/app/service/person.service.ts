import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from '../model/Person';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  public rootUrl: String = "http://localhost:8080/";
  private httpOptions = {
    headers: new HttpHeaders({
      'ContentType': 'application/json'
    })
  }

  constructor(public http: HttpClient) { }

  /**
   * Synchronizes the provided list of people with what is on the server
   * calls http://localhost/person
   * @param people 
   */
  public getPeople(): Observable<Object> {
    return this.http.get(this.rootUrl + "person");
  }

  public addPerson(person: Person): Observable<Object> {
    return this.http.post(this.rootUrl + "person", person, this.httpOptions);
  }

  public removePerson(person: Person): Observable<Object>  {
    return this.http.delete(this.rootUrl + "person/" + person.id);
  }

  public updatePerson(person: Person): Observable<Object>  {
    return this.http.put(this.rootUrl + "person", person);
  }

  public deleteAllPeople(): Observable<Object>  {
    return this.http.delete(this.rootUrl + "person");
  }

  /**
   * Syncronizes the localList to the remote list. final list is the localList 
   * Why? so that the UI doesnt shutter on update
   * Why a sperate function? easier to unit test 
   * @param localList 
   * @param remoteList 
   */
  public static syncPeople(localList: Array<Person>, remoteList: Array<Person>) {
    //first sweep to add and update from remotelist
    remoteList.forEach(
      (apiPerson: Person) => {
        var found = false;
        localList.forEach(
          (localPerson: Person) => {
            if (apiPerson.id == localPerson.id && found == false) {
              Person.update(localPerson, apiPerson);
              found = true;
            }
          }
        )
        if (found == false) {
          localList.push(apiPerson);
        }
      }
    );
    //second sweep to remove people from locallist not in remote list
    localList.forEach(
      (localPerson: Person) => {
        var found = false;
        remoteList.forEach(
          (apiPerson: Person) => {
            if (apiPerson.id == localPerson.id) {
              found = true;
            }
          }
        )
        if (found == false) {
          localList.splice(localList.indexOf(localPerson, 0), 1)
        }
      }
    )
  }
}
