import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  getRole(){
    const helper = new JwtHelperService();
    // const myRawToken = this.cookie.get('token');
    const myRawToken = localStorage.getItem('token');
    const decodedToken = helper.decodeToken(myRawToken);
    return decodedToken;
  }
  isUser(){
    return !!(this.getRole().role === 'user');

  }
  isAdmin(){
    return !!(this.getRole().role === 'admin');

  }
  isModerator(){
    return !!(this.getRole().role === 'moderator');

  }
}
