import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.scss']
})
export class AddUserComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required]
      // message: ['', Validators.required]
    });
   }

   onSubmit(){
     this.submitted = true;
     if (this.messageForm.valid) {
       DataService.addUser({name: this.messageForm.controls.name.value});
       this.success = true;
     }
     return;
   }
  ngOnInit() {
  }

}
