import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  h1Style = false;

  constructor(private data: DataService) { }

  users: User[] = [];

  ngOnInit() {
    // TODO: retrieve data from database & save to database
    this.data.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }

}

