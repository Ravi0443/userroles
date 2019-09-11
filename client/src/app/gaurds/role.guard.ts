import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(private auth: UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    // const token = this.cookieService.get('token');
    const tokenPayload = helper.decodeToken(token);
    if (!this.auth.loggedIn() || tokenPayload.role === expectedRole) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
