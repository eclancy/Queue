import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { User } from '../models/user';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { MatDialog } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  h1Style = false;
  addDialogForm: FormGroup;

  constructor(
    private data: DataService, 
    public dialog: MatDialog,
    private formBuilder: FormBuilder
    ) { 
      this.addDialogForm = this.formBuilder.group({
        name: ['', Validators.required]
      });
    }

  users: User[] = [];
  // users: Array<User>;

  ngOnInit() {
    // TODO: retrieve data from database & save to database
    this.data.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }

  onSeatClick(i: number): void {
    this.users.splice(i, 1);
  }

  openAddDialog(): void {
    this.addDialogForm.setValue({name: ''});

    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '500px',
      data: this.addDialogForm
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        DataService.addUser({name: this.addDialogForm.controls.name.value});
      }
    });
  }
}