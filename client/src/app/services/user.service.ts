import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../register/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userAPI = 'http://localhost:3000/users/';

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User) {
      return this.http.post(this.userAPI + 'register', user);
  }
  login(user: User) {
    const  loginURL = this.userAPI  + 'login';
    return this.http.post<any>(loginURL, user);
    // return this.http.post(this.userAPI + 'login', user);
  }
  loggedIn(){
    // return this.CookieService.check('token');
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
    // return this.CookieService.get('token');
  }

  logout(){
    // this.CookieService.delete('token');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // checkExists(official_mail){
  //   return this.http.get<any>(this.existsUrl+`/${official_mail}`);
  // }

  // savePassword(data,mail){
  //   return this.http.put<any>(this.updateUrl+`/${mail}`,data);
  // }

  // changePassword(data,id){
  //   return this.http.put<any>(this.changeUrl+`/${id}`,data);
  // }
}
