import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from './user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private userservice: UserService) { }

    // registerForm = this.formbuilder.group({
    //   first_name: [''],
    //   last_name: [''],
    //   email: [''],
    //   password: [''],
    //   permission: ['']
    // });

    user = new User();

  ngOnInit() {
  }
  onRegister() {
      this.userservice.register(this.user).subscribe(res => {
        console.log(res);
      });
  }
}
