import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './models/user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // getUsers() {
  //   return this.http.get('https://jsonplaceholder.typicode.com/photos');
  // }

  static users: User[] = [];

  static addUser(user: User) {
    this.users.push(user);
  }

  getUsers() {
    return of(DataService.users);
  }

}
