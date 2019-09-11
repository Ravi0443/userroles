import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  constructor(public userservice: UserService, public role: RoleService) {

  }
}
