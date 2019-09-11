import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder } from '@angular/forms';
import { User } from '../register/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private userservice: UserService, private formbuilder: FormBuilder, private router: Router) { }
  // loginForm = this.formbuilder.group({
  //   email: [''],
  //   password: ['']
  // });
  user = new User();

  ngOnInit() {
  }
  onLogin() {
    this.userservice.login(this.user).subscribe(res => {
      localStorage.setItem('token', res.token);
      console.log(res);
      console.log(this.user);
      // this.router.navigate(['/home']);
    });
  }

}
