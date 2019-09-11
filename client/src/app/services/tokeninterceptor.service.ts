import { Injectable ,Injector} from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(req, next) {
    const authenticationService = this.injector.get(UserService);
    const tokenizedReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${authenticationService.getToken()}`
        }
      });
    return next.handle(tokenizedReq);
  }
}
